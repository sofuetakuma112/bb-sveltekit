import { getRecommendedPosts, getFollowingPosts } from '$lib/server/drizzle/get/post';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  event.depends('swipe:allPosts');

  const currentUser = event.locals.user;
  if (!currentUser) {
    redirect(302, '/login');
  }

  const userId = currentUser.id;

  const type = event.url.searchParams.get('type') ?? 'recommend';

  const db = event.locals.db;
  const r2 = event.platform?.env.R2 as R2Bucket;

  const { posts } =
    type === 'recommend'
      ? await getRecommendedPosts(db, r2, userId, { limit: 10 })
      : await getFollowingPosts(db, r2, userId, { limit: 10 });

  return { type, posts };
};
