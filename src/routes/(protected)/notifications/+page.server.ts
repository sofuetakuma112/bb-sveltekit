import { getNotifications } from '@/drizzle/get/notification';
import { protectedRouteLoad } from '@/server/setupEvent';

export const load = protectedRouteLoad(async (event, currentUser) => {
  const db = event.locals.db;
  const r2 = event.platform?.env.R2 as R2Bucket;

  return await getNotifications(db, r2, currentUser.id);
});
