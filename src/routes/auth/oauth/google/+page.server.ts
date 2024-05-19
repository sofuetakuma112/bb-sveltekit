import { redirect } from '@sveltejs/kit';
import { generateState, generateCodeVerifier } from 'arctic';
import { initializeGoogleOauth } from '$lib/server/lucia';
import { publicRouteLoad } from '$lib/server/setupEvent';

export const load = publicRouteLoad(async (event) => {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const googleOauth = initializeGoogleOauth(
    event.platform?.env.GOOGLE_CLIENT_ID ?? '',
    event.platform?.env.GOOGLE_CLIENT_SECRET ?? ''
  );
  const url = await googleOauth.createAuthorizationURL(state, codeVerifier, {
    scopes: ['profile', 'email']
  });

  // store state verifier as cookie
  event.cookies.set('google_state', state, {
    secure: true, // set to false in localhost
    path: '/',
    httpOnly: true,
    maxAge: 60 * 10 // 10 min
  });

  // store code verifier as cookie
  event.cookies.set('google_code_verifier', codeVerifier, {
    secure: true, // set to false in localhost
    path: '/',
    httpOnly: true,
    maxAge: 60 * 10 // 10 min
  });

  return redirect(302, url);
});
