import { getFollowees } from '$lib/drizzle/get/follow';
import { protectedRouteLoad } from '$lib/server/setupEvent';
import { redirect, error } from '@sveltejs/kit';

export const load = protectedRouteLoad(async (event) => {
  const currentUser = event.locals.user;
  if (!currentUser) {
    redirect(302, '/login');
  }

  if (!event.params.userId) {
    error(400, 'userId is required');
  }

  const db = event.locals.db;
  const r2 = event.platform?.env.R2 as R2Bucket;

  const data = await getFollowees(db, r2, event.params.userId, currentUser.id);

  return { followees: data.followees };
});