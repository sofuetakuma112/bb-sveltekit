// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    interface Locals {
      lucia: import('$lib/server/lucia').Auth;
      DB: D1Database;
      db: ReturnType<
        typeof import('drizzle-orm/d1').drizzle<typeof import('$lib/server/db/schema')>
      >;
      user: import('lucia').User | null;
      session: import('lucia').Session | null;
      isMobile: boolean;
    }
    interface Platform {
      env: {
        DB: D1Database;
        R2: R2Bucket;
      };
      cf: CfProperties;
      ctx: ExecutionContext;
    }
  }
}

export {};
