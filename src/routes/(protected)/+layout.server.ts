import { protectedRouteLoad } from '$lib/server/setupEvent';

export const load = protectedRouteLoad(async (event) => {
  return { user: event.locals.user };
});
