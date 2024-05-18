import { followsTable, usersTable } from '$lib/server/db/schema';
import { getImageUrlFromR2 } from '$lib/r2';
import type { InferSelectModel } from 'drizzle-orm';

export async function serializeFollowerUser(
  r2: R2Bucket,
  user: InferSelectModel<typeof usersTable>,
  currentUser: InferSelectModel<typeof usersTable> & {
    followers: {
      follower: InferSelectModel<typeof usersTable>;
    }[];
    followees: InferSelectModel<typeof followsTable>[];
  }
) {
  const imageUrl = getImageUrlFromR2(user.imageS3Key);
  return {
    id: user.id,
    name: user.name,
    imageUrl: imageUrl || user.icon,
    isFollowee: currentUser.followees.some(({ followeeId }) => followeeId === user.id),
    isFollower: currentUser.followers.some(({ follower: { id } }) => id === user.id),
    createdAt: user.createdAt
    // updatedAt: user.updatedAt,
  };
}

export async function serializeFolloweeUser(
  r2: R2Bucket,
  user: InferSelectModel<typeof usersTable>,
  currentUser: InferSelectModel<typeof usersTable> & {
    followers: InferSelectModel<typeof followsTable>[];
    followees: {
      followee: InferSelectModel<typeof usersTable>;
    }[];
  }
) {
  const imageUrl = getImageUrlFromR2(user.imageS3Key);
  return {
    id: user.id,
    name: user.name,
    imageUrl: imageUrl || user.icon,
    isFollowee: currentUser.followees.some(({ followee: { id } }) => id === user.id),
    isFollower: currentUser.followers.some(({ followerId }) => followerId === user.id),
    createdAt: user.createdAt
    // updatedAt: user.updatedAt,
  };
}
