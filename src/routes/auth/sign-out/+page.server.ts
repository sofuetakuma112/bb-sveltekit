// import { redirect } from 'sveltekit-flash-message/server';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load = async () => {
	// ...
};

export const actions: Actions = {
	default: async (event) => {
		if (!event.locals.user) redirect(302, '/');
		if (event.locals.session) {
			await event.locals.lucia.invalidateSession(event.locals.session.id);
			const sessionCookie = event.locals.lucia.createBlankSessionCookie();
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}
		redirect(302, '/');
	}
};

//toast also doesn't work this way.
/*
import { auth } from '$lib/server/lucia';
import { setFlash } from 'sveltekit-flash-message/server';
import { redirect } from '@sveltejs/kit';
export const actions = {
	default: async (event) => {
		const session = await event.locals.auth.validate();
		if (!session) {
			redirect(302, '/');
		}
		
		await auth.invalidateSession(session.sessionId); // invalidate session
		event.locals.auth.setSession(null); // remove cookie
		setFlash({ type: 'success', message: 'Logged out' }, event);
		redirect(302, '/');
		
	}
};
*/
