import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { dev } from '$app/environment';

export const GET: RequestHandler = async (event) => {
  const type = event.params.type;
  const name = event.params.name;

  // FIXME: ローカル開発でもwasm-image-optimizationからimportできるようにする
  let optimizeImage
  if (dev) {
    optimizeImage = await import('wasm-image-optimization/node').then(
      (module) => module.optimizeImage
    );
  } else {
    optimizeImage = await import('wasm-image-optimization').then(
      (module) => module.optimizeImage
    );
  }

  const queryParams = event.url.searchParams;
  const w = queryParams.get('w');
  const q = queryParams.get('q');
  const width = w ? parseInt(w) : undefined;
  const quality = q ? parseInt(q) : undefined;

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

  const buffer = await object.arrayBuffer();
  const image = await optimizeImage({
    image: buffer,
    width: width,
    quality: quality,
    format: 'webp'
  });

  return new Response(image, {
    headers: {
      'Content-Type': 'image/webp',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  });
};
