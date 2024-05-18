import { protectedRouteLoad } from '@/server/setupEvent';
import { error } from '@sveltejs/kit';

export const load = protectedRouteLoad((event, currentUser) => {
  if (!event.params.userId) {
    error(400, 'userId is required');
  }

  return { currentUser };
});
