import { usersTable } from "$lib/server/db/schema";
import {
  serializeFolloweeUser,
  serializeFollowerUser,
} from "$lib/serializers/follow";
import type { DrizzleClient } from "$lib/types/drizzle";
import { eq } from "drizzle-orm";

export const getFollowees = async (
  db: DrizzleClient,
  r2: R2Bucket,
  userId: string,
  currentUserId: string
) => {
  const [user, currentUser] = await Promise.all([
    db.query.usersTable.findFirst({
      where: eq(usersTable.id, userId),
    }),
    db.query.usersTable.findFirst({
      where: eq(usersTable.id, currentUserId),
      with: {
        followees: {
          with: {
            followee: true,
          },
        },
        followers: true,
      },
    }),
  ]);

  if (!user || !currentUser) {
    throw new Response("User not found", { status: 404 });
  }

  const followees = await Promise.all(
    currentUser.followees.map(({ followee }) =>
      serializeFolloweeUser(r2, followee, currentUser)
    )
  );

  return { followees, user, currentUser };
};

export const getFollowers = async (
  db: DrizzleClient,
  r2: R2Bucket,
  userId: string,
  currentUserId: string
) => {
  const [user, currentUser] = await Promise.all([
    db.query.usersTable.findFirst({
      where: eq(usersTable.id, userId),
    }),
    db.query.usersTable.findFirst({
      where: eq(usersTable.id, currentUserId),
      with: {
        followers: {
          with: {
            follower: true,
          },
        },
        followees: true,
      },
    }),
  ]);

  if (!user || !currentUser) {
    throw new Response("User not found", { status: 404 });
  }

  const followers = await Promise.all(
    currentUser.followers.map(({ follower }) =>
      serializeFollowerUser(r2, follower, currentUser)
    )
  );

  return { followers, user, currentUser };
};

export type SerializeFolloweeUser = Awaited<
  ReturnType<typeof serializeFolloweeUser>
>;

export type SerializeFollowerUser = Awaited<
  ReturnType<typeof serializeFollowerUser>
>;