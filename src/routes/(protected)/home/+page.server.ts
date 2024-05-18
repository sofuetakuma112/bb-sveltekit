import { getRecommendedPosts, getFollowingPosts } from '$lib/drizzle/get/post';
import * as schema from '$lib/server/db/schema';
import { drizzle } from 'drizzle-orm/d1';
import { protectedRouteLoad } from '@/server/setupEvent';

export const load = protectedRouteLoad(async (event, currentUser) => {
  const userId = currentUser.id;

  const type = event.url.searchParams.get('type') ?? 'recommend';

  // const db = event.locals.db;
  const db = drizzle(event.platform?.env.DB as D1Database, { schema });
  const r2 = event.platform?.env.R2 as R2Bucket;

  const { post } =
    type === 'recommend'
      ? await getRecommendedPosts(db, r2, userId)
      : await getFollowingPosts(db, r2, userId);

  return { type, post };
});
