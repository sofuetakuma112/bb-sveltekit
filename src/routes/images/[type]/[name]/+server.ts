import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
  const type = event.params.type;
  const name = event.params.name;

  const object = await event.platform?.env.R2.get(`${type}/${name}`);

  if (object == null) {
    error(404);
  }

  const blob = await object.blob();

  const headers: HeadersInit = new Headers();
  headers.set('contentType', blob.type.split('/').pop() ?? '');
  headers.set('etag', object.etag);

  return new Response(blob, { headers });
};
