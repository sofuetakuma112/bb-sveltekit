import { protectedRouteLoad } from '@/server/setupEvent';

export const load = protectedRouteLoad(async (event) => {
  return { user: event.locals.user };
});
