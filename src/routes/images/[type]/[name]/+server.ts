import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { dev } from '$app/environment';

export const GET: RequestHandler = async (event) => {
  const type = event.params.type;
  const name = event.params.name;

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

  // const query = event.url.searchParams.toString();

  // const queryString = query ? `?${query}` : '';
  // console.log(`http://localhost:8787/images/${type}/${name}${queryString}`)
  // const res = await fetch(`http://localhost:8787/images/${type}/${name}${queryString}`);

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

  // const object = await event.platform?.env.R2.get(`${type}/${name}`);

  // if (object == null) {
  //   error(404);
  // }

  // const blob = await object.blob();

  // const headers: HeadersInit = new Headers();
  // headers.set('contentType', blob.type.split('/').pop() ?? '');
  // headers.set('etag', object.etag);

  // return new Response(blob, { headers });
};
