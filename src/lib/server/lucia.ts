import { Lucia, TimeSpan } from 'lucia';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { dev } from '$app/environment';
import { sessionsTable, usersTable } from '$lib/server/db/schema';
import { BASE_URL } from '$lib/config/constants';
import { Google } from 'arctic';
import { env } from '$env/dynamic/private';
import { getImageUrlFromR2 } from '$lib/r2';
import type { DrizzleClient } from '$lib/types/drizzle';

export const initializeLucia = (db: DrizzleClient) => {
  const adapter = new DrizzleSQLiteAdapter(db, sessionsTable, usersTable);
  return new Lucia(adapter, {
    sessionCookie: {
      name: 'session',
      expires: false, // session cookies have very long lifespan (2 years)
      attributes: {
        secure: !dev
      }
    },
    sessionExpiresIn: new TimeSpan(30, 'd'), // no more active/idle
    getUserAttributes: (attributes) => {
      const imageUrl = getImageUrlFromR2(attributes.imageS3Key);
      return {
        userId: attributes.id,
        provider: attributes.provider,
        providerId: attributes.providerId,
        email: attributes.email,
        name: attributes.name,
        token: attributes.token,
        imageUrl: imageUrl || attributes.icon
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
  name: string;
  token: string;
  icon: string;
  imageS3Key: string | null;
}

const googleRedirectUrl = dev
  ? 'http://localhost:5173/auth/oauth/google/callback'
  : `${BASE_URL}/auth/oauth/google/callback`;

export const initializeGoogleOauth = () => {
  return new Google(env.GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_SECRET, googleRedirectUrl);
};
