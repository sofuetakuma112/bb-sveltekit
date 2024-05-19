import { getNotifications } from '$lib/server/drizzle/get/notification';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const currentUser = event.locals.user;
  if (!currentUser) {
    redirect(302, '/login');
  }

  const db = event.locals.db;
  const r2 = event.platform?.env.R2 as R2Bucket;

  return await getNotifications(db, r2, currentUser.id);
}
