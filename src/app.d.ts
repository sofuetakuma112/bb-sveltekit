// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			lucia: import('$lib/server/lucia').Auth;
			DB: D1Database;
			db: import('drizzle-orm/d1').DrizzleD1Database;
			user: import('lucia').User | null;
			session: import('lucia').Session | null;
		}
		interface Platform {
			env: {
				DB: D1Database;
			};
			cf: CfProperties;
			ctx: ExecutionContext;
		}
	}
}

export {};
