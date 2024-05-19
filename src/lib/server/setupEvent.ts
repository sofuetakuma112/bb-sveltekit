import { initializeLucia } from '$lib/server/lucia';
import { redirect } from '@sveltejs/kit';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '$lib/server/db/schema';
import type { RequestEvent } from '@sveltejs/kit';
import type { Lucia } from 'lucia';

export async function setupDatabase(event: RequestEvent) {
  event.locals.DB = <D1Database>event.platform?.env?.DB;
  event.locals.db = drizzle(event.locals.DB, { schema });
  event.locals.lucia = initializeLucia(event.locals.db);
}

function isProtectedRoute(event: RequestEvent): boolean {
  return event.route.id?.startsWith('/(protected)') ?? false;
}

function handleNoSession(event: RequestEvent, isProtected: boolean) {
  if (!isProtected) {
    event.locals.user = null;
    event.locals.session = null;
    return;
  }
  throw redirect(302, '/login');
}

async function handleExistingSession(event: RequestEvent, lucia: Lucia, sessionId: string) {
  const { session, user } = await lucia.validateSession(sessionId);

  if (session && (new Date() < new Date(session.expiresAt) || session.fresh)) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes
    });
  } else {
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes
    });
  }

  if (isProtectedRoute(event) && !user) {
    throw redirect(302, '/login');
  }

  event.locals.user = user;
  event.locals.session = session;
}

export async function setupEvent(event: RequestEvent) {
  await setupDatabase(event);

  const lucia = event.locals.lucia;
  const sessionId = event.cookies.get(lucia.sessionCookieName);

  if (!sessionId) {
    handleNoSession(event, isProtectedRoute(event));
    return;
  }

  await handleExistingSession(event, lucia, sessionId as string);
}

// export const publicRouteLoad = (callback: (event: ServerLoadEvent) => unknown) => {
//   return async (event: ServerLoadEvent) => {
//     await setupEvent(event);

//     return callback(event);
//   };
// };

// export const protectedRouteLoad = (
//   callback: (event: ServerLoadEvent, currentUser: User) => unknown
// ) => {
//   return async (event: ServerLoadEvent) => {
//     await setupEvent(event);
//     const currentUser = event.locals.user;
//     if (!currentUser) {
//       redirect(302, '/login');
//     }

//     return callback(event, currentUser);
//   };
// };
