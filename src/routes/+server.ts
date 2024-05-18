import { publicRouteLoad } from '@/server/setupEvent';

export const GET = publicRouteLoad(async (event) => {
  if (event.locals.user) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/home'
      }
    });
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/login'
    }
  });
});
