import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { setupDatabase } from '$lib/server/setupEvent';

export const actions: Actions = {
  default: async (event) => {
    await setupDatabase(event);

    const lucia = event.locals.lucia;
    const sessionId = event.cookies.get(lucia.sessionCookieName);

    if (sessionId) {
      await event.locals.lucia.invalidateSession(sessionId);
      const sessionCookie = event.locals.lucia.createBlankSessionCookie();
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: '.',
        ...sessionCookie.attributes
      });
    }
    
    redirect(302, '/login');
  }
};
