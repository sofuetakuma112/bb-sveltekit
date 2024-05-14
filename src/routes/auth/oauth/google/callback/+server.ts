import { error } from '@sveltejs/kit';
import { getUserByEmail, createUser } from '$lib/server/db/user-model';
import { initializeGoogleOauth } from '$lib/server/lucia';
import { OAuth2RequestError } from 'arctic';

type GoogleUser = {
	sub: string;
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
	email: string;
	email_verified: boolean;
	locale: string;
};

export const GET = async (event) => {
	if (event.locals.user) {
		console.log('event.locals.user => %o', event.locals.user);
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/home'
			}
		});
	}
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('google_state') ?? null;
	const storedCodeVerifier = event.cookies.get('google_code_verifier') ?? null;
	if (!code || !storedState || !storedCodeVerifier || state !== storedState) {
		error(400, 'invalid parameteres');
	}
	try {
		const googleOauth = initializeGoogleOauth();
		const tokens = await googleOauth.validateAuthorizationCode(code, storedCodeVerifier);
		const response = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const googleUser = (await response.json()) as GoogleUser;
		const existingUser = await getUserByEmail(event.locals.db, googleUser.email);

		if (existingUser) {
			const session = await event.locals.lucia.createSession(existingUser.id, {});

			const sessionCookie = event.locals.lucia.createSessionCookie(session.id);

			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		} else {
			// new User
			const token = crypto.randomUUID();
			const id = crypto.randomUUID();
			const newGoogleUser = {
				id: id,
				provider: 'google',
				providerId: googleUser.sub,
				email: googleUser.email.toLowerCase(),
				name: googleUser.name,
				token,
				icon: googleUser.picture
			};
			const newUser = await createUser(event.locals.db, newGoogleUser);
			if (newUser) {
				const session = await event.locals.lucia.createSession(newUser.id, {});
				const sessionCookie = event.locals.lucia.createSessionCookie(session.id);
				event.cookies.set(sessionCookie.name, sessionCookie.value, {
					path: '.',
					...sessionCookie.attributes
				});
			}
		}
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/home'
			}
		});
	} catch (e) {
		if (e instanceof OAuth2RequestError && e.message === 'bad_verification_code') {
			// invalid code
			error(400, 'invalid verification code');
		}
	}
};
