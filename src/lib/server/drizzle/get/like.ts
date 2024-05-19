import { likesTable, usersTable } from '$lib/server/db/schema';
import { serializeLike } from '$lib/server/serializers/like';
import type { DrizzleClient } from '$lib/server/types/drizzle';
import { eq, and, count } from 'drizzle-orm';

export async function getLikePosts(
  db: DrizzleClient,
  r2: R2Bucket,
  userId: string,
  currentUserId: string,
  likeType: 'like' | 'super_like'
) {
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, userId)
  });

  if (!user) {
    throw new Response('User not found', { status: 404 });
  }

  const likes = await db.query.likesTable.findMany({
    where: and(eq(likesTable.userId, currentUserId), eq(likesTable.likeType, likeType)),
    with: {
      post: {
        with: {
          user: true,
          likes: true,
          hashtags: {
            with: {
              tag: true
            }
          }
        }
      }
    }
  });

  return {
    posts: await Promise.all(likes.map((like) => serializeLike(r2, like)))
  };
}

export async function getLikePostsCount(
  db: DrizzleClient,
  r2: R2Bucket,
  userId: string,
  currentUserId: string,
  likeType: 'like' | 'super_like'
) {
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, userId)
  });

  if (!user) {
    throw new Response('User not found', { status: 404 });
  }

  const likePostsCount = await db
    .select({ count: count() })
    .from(likesTable)
    .where(and(eq(likesTable.userId, currentUserId), eq(likesTable.likeType, likeType)));

  return {
    likePostsCount
  };
}
