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
