import { publicRouteLoad } from '$lib/server/setupEvent';
import { redirect } from '@sveltejs/kit';

// 無限リダイレクトになるので、ここではprotectedRouteLoadは使わない
export const load = publicRouteLoad(async (event) => {
  if (event.locals.user) {
    redirect(302, '/home');
  }
});
