import { getRecommendedPosts, getFollowingPosts } from '$lib/server/drizzle/get/post';
import { like } from '$lib/server/drizzle/mutation/like';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const currentUser = event.locals.user;
  if (!currentUser) {
    redirect(302, '/login');
  }

  const userId = currentUser.id;

  const type = event.url.searchParams.get('type') ?? 'recommend';

  const db = event.locals.db;
  const r2 = event.platform?.env.R2 as R2Bucket;

  const { post } =
    type === 'recommend'
      ? await getRecommendedPosts(db, r2, userId)
      : await getFollowingPosts(db, r2, userId);

  return { type, post };
};

export const actions = {
  default: async (event) => {
    const currentUser = event.locals.user;
    if (!currentUser) {
      redirect(302, '/login');
    }

    const data = await event.request.formData();
    const postId = data.get('postId')?.toString();
    if (postId == null) {
      return new Response('postId is required', { status: 400 });
    }
    const likeType = data.get('likeType')?.toString();
    if (likeType == null) {
      return new Response('likeType is required', { status: 400 });
    }

    await like(event.locals.db, currentUser.id, postId, likeType);

    return { success: true };
  }
};
