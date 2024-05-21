import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
  const currentUser = event.locals.user;
  if (!currentUser) {
    redirect(302, '/login');
  }

  return { user: currentUser, isMobile: event.locals.isMobile };
};
