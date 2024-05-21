import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { dev } from '$app/environment';

export const GET: RequestHandler = async (event) => {
  const type = event.params.type;
  const name = event.params.name;

  // FIXME: ローカル開発でもwasm-image-optimizationからimportできるようにする
  let photon;
  if (dev) {
    photon = await import('@cf-wasm/photon/node');
  } else {
    photon = await import('@cf-wasm/photon');
  }

  const queryParams = event.url.searchParams;
  const w = queryParams.get('w');
  // const q = queryParams.get('q');
  const width = w ? parseInt(w) : undefined;
  // const quality = q ? parseInt(q) : undefined;

  const r2 = event.platform?.env.R2;
  if (r2 == null) {
    error(500);
  }
  const object = await r2.get(`${type}/${name}`);

  if (object == null) {
    return new Response('404 Not Found', {
      status: 404,
      statusText: 'NOT FOUND'
    });
  }

  const imageBufer = await object.arrayBuffer()
  const inputBytes = new Uint8Array(imageBufer)

  if (width == null) {
    return new Response(inputBytes, {
      headers: {
        'Content-Type': 'image/webp'
      }
    });
  }

  // create a photon instance
  const inputImage = photon.PhotonImage.new_from_byteslice(inputBytes);

  // const aspectRatio = inputImage.get_width() / inputImage.get_height();
  const ratio = width / inputImage.get_width();

  // resize image using photon
  const outputImage = photon.resize(inputImage, width, inputImage.get_height() * ratio, 1);

  // get webp bytes
  const outputBytes = outputImage.get_bytes_webp();

  // for other formats
  // png  : outputImage.get_bytes();
  // jpeg : outputImage.get_bytes_jpeg(quality);

  // return the Response instance
  return new Response(outputBytes, {
    headers: {
      'Content-Type': 'image/webp',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  });
};
