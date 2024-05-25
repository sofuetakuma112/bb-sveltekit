import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { like } from '$lib/server/drizzle/mutation/like';

export const POST: RequestHandler = async (event) => {
  const currentUser = event.locals.user;
  if (!currentUser) {
    redirect(302, '/login');
  }

  const { postId, likeType } = await event.request.json<{
    postId: string;
    likeType: string;
  }>();

  if (postId == null) {
    return new Response('postId is required', { status: 400 });
  }
  if (likeType == null) {
    return new Response('likeType is required', { status: 400 });
  }

  await like(event.locals.db, currentUser.id, postId, likeType);

  return new Response('success', { status: 200 });
};
