import { initializeLucia } from '$lib/server/lucia';
import { redirect } from '@sveltejs/kit';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '$lib/server/db/schema';
import type { RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import type { User } from 'lucia';

export async function setupEvent(event: RequestEvent) {
  event.locals.DB = <D1Database>event.platform?.env?.DB;
  event.locals.db = drizzle(event.locals.DB, { schema });
  event.locals.lucia = initializeLucia(event.locals.DB);

  const lucia = event.locals.lucia;
  const isProtectedRoute = event.route.id?.startsWith('/(protected)');

  const sessionId = event.cookies.get(lucia.sessionCookieName);
  if (!sessionId && !isProtectedRoute) {
    event.locals.user = null;
    event.locals.session = null;
    return;
  }
  if (!sessionId && isProtectedRoute) {
    throw redirect(302, '/login');
  }

  const { session, user } = await lucia.validateSession(sessionId as string);
  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes
    });
  }
  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes
    });
  }

  if (isProtectedRoute && user == null) {
    throw redirect(302, '/login');
  }

  event.locals.user = user;
  event.locals.session = session;
}

export const publicRouteLoad = (callback: (event: ServerLoadEvent) => unknown) => {
  return async (event: ServerLoadEvent) => {
    await setupEvent(event);

    return callback(event);
  };
};

export const protectedRouteLoad = (
  callback: (event: ServerLoadEvent, currentUser: User) => unknown
) => {
  return async (event: ServerLoadEvent) => {
    await setupEvent(event);
    const currentUser = event.locals.user;
    if (!currentUser) {
      redirect(302, '/login');
    }

    return callback(event, currentUser);
  };
};
