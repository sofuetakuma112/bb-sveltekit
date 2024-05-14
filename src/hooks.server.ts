import { initializeLucia } from '$lib/server/lucia';
import { redirect, type Handle } from '@sveltejs/kit';
import { drizzle } from 'drizzle-orm/d1';
// import type { HandleServerError } from '@sveltejs/kit';

// import log from '$lib/server/log';

// export const handleError: HandleServerError = async ({ error, event }) => {
// 	const errorId = crypto.randomUUID();

// 	event.locals.error = error?.toString() || '';
// 	if (error instanceof Error) {
// 		event.locals.errorStackTrace = error.stack || '';
// 	} else {
// 		event.locals.errorStackTrace = '';
// 	}
// 	event.locals.errorId = errorId;
// 	// log(500, event);

// 	return {
// 		message: 'An unexpected error occurred.',
// 		errorId
// 	};
// };

export const handle: Handle = async ({ event, resolve }) => {
	// const startTimer = Date.now();
	// event.locals.startTimer = startTimer;

	event.locals.DB = <D1Database>event.platform?.env.DB;
	event.locals.db = drizzle(event.locals.DB);
	event.locals.lucia = initializeLucia(event.locals.db);

	const lucia = event.locals.lucia;

	const sessionId = event.cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);
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
	event.locals.user = user;
	event.locals.session = session;

	if (event.route.id?.startsWith('/(protected)')) {
		if (!user) redirect(302, '/');
	}

	const response = await resolve(event);
	// log(response.status, event);
	return response;
};
