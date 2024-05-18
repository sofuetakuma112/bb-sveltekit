import { getNotifications } from '$lib/drizzle/get/notification';
import { protectedRouteLoad } from '$lib/server/setupEvent';

export const load = protectedRouteLoad(async (event, currentUser) => {
  const db = event.locals.db;
  const r2 = event.platform?.env.R2 as R2Bucket;

  return await getNotifications(db, r2, currentUser.id);
});
