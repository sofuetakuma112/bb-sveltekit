import { usersTable } from '$lib/server/db/schema';
import { serializeCurrentUser, serializeUser } from '$lib/serializers/user';
import type { DrizzleClient } from '$lib/types/drizzle';
import { eq } from 'drizzle-orm';

export async function getUser(
  db: DrizzleClient,
  r2: R2Bucket,
  userId: string,
  currentUserId: string
) {
  const [user, currentUser] = await Promise.all([
    db.query.usersTable.findFirst({
      where: eq(usersTable.id, userId),
      with: {
        posts: true,
        likes: true,
        followers: true,
        followees: true
      }
    }),
    db.query.usersTable.findFirst({
      where: eq(usersTable.id, currentUserId),
      with: {
        notifications: true,
        followers: true,
        followees: true
      }
    })
  ]);

  if (!user) {
    throw new Response('User not found', { status: 404 });
  }
  if (!currentUser) {
    throw new Response('Unauthorized', { status: 401 });
  }

  return {
    user: await serializeUser(r2, user, currentUser)
  };
}

export async function getCurerntUser(db: DrizzleClient, r2: R2Bucket, currentUserId: string) {
  const currentUser = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, currentUserId)
  });

  if (!currentUser) {
    throw new Response('User not found', { status: 404 });
  }

  return {
    user: await serializeCurrentUser(r2, currentUser)
  };
}
