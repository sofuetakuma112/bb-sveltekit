import { setupEvent } from '@/server/setupEvent';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
  await setupEvent(event);

  if (event.locals.user) {
    redirect(302, '/home');
  }
};
