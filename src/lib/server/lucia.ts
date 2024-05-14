import { Lucia, TimeSpan } from 'lucia';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { dev } from '$app/environment';
import type { DrizzleD1Database } from 'drizzle-orm/d1';
import { sessionsTable, usersTable } from '$lib/server/db/schema';
import { BASE_URL } from '$lib/config/constants';
import { Google } from 'arctic';
import { env } from '$env/dynamic/private';

export const initializeLucia = (db: DrizzleD1Database) => {
	const adapter = new DrizzleSQLiteAdapter(db, sessionsTable, usersTable);
	return new Lucia(adapter, {
		sessionCookie: {
			name: 'session',
			expires: false, // session cookies have very long lifespan (2 years)
			attributes: {
				secure: !dev,
			}
		},
		sessionExpiresIn: new TimeSpan(30, 'd'), // no more active/idle
		getUserAttributes: (attributes) => {
			return {
				userId: attributes.id,
				provider: attributes.provider,
				providerId: attributes.providerId,
				email: attributes.email,
				firstName: attributes.firstName,
				lastName: attributes.lastName,
				role: attributes.role,
				verified: attributes.verified,
				receiveEmail: attributes.receiveEmail,
				token: attributes.token
			};
		}
	});
};
export type Auth = ReturnType<typeof initializeLucia>;

declare module 'lucia' {
	interface Register {
		Lucia: ReturnType<typeof initializeLucia>;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	id: string;
	provider: string;
	providerId: string;
	email: string;
	firstName: string;
	lastName: string;
	role: string;
	verified: boolean;
	receiveEmail: boolean;
	token: string;
}

const googleRedirectUrl = dev
	? 'http://localhost:5173/auth/oauth/google/callback'
	: `${BASE_URL}/auth/oauth/google/callback`;

export const initializeGoogleOauth = () => {
	return new Google(env.GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_SECRET, googleRedirectUrl);
};
