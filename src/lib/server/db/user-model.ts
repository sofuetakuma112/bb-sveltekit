import { eq } from 'drizzle-orm';
import { usersTable } from '$lib/server/db/schema';
import type { User, UpdateUser } from '$lib/server/db/schema';
import type { DrizzleD1Database } from 'drizzle-orm/d1';

export const getUserByEmail = async (db: DrizzleD1Database, email: string) => {
	const user = await db.select().from(usersTable).where(eq(usersTable.email, email));
	if (user.length === 0) {
		return null;
	} else {
		return user[0];
	}
};

export const getUserByToken = async (db: DrizzleD1Database, token: string) => {
	const user = await db.select().from(usersTable).where(eq(usersTable.token, token));
	if (user.length === 0) {
		return null;
	} else {
		return user[0];
	}
};

export const updateUser = async (db: DrizzleD1Database, id: string, user: UpdateUser) => {
	const result = await db.update(usersTable).set(user).where(eq(usersTable.id, id)).returning();
	if (result.length === 0) {
		return null;
	} else {
		return result[0];
	}
};

export const createUser = async (db: DrizzleD1Database, user: User) => {
	const result = await db.insert(usersTable).values(user).onConflictDoNothing().returning();
	if (result.length === 0) {
		return null;
	} else {
		return result[0];
	}
};
