// import { D1Database$ } from 'cfw-bindings-wrangler-bridge';

import { setupEvent } from '$lib/server/setupEvent';
import type { Handle } from '@sveltejs/kit';

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

// const getDevD1 = async (dbName: string) => {
//   return new D1Database$(dbName) as D1Database;
// };

// FIXME: ここではevent.platform?.env?.DBがundefinedで渡ってくることがあるので、
// 代わりにload関数でsetupEventを呼び出す
export const handle: Handle = async ({ event, resolve }) => {
  await setupEvent(event);
  return await resolve(event);
};
