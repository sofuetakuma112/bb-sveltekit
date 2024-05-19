import { drizzle } from "drizzle-orm/d1";
import * as schema from "$lib/server/db/schema";

export type DrizzleClient = ReturnType<typeof drizzle<typeof schema>>;
