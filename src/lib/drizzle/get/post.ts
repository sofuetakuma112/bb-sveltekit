import { followsTable, likesTable, postsTable, usersTable } from '$lib/server/db/schema';
import { serializePost } from '$lib/serializers/post';
import type { DrizzleClient } from '$lib/types/drizzle';
import { eq, desc, and, not, notInArray, isNull, inArray, or } from 'drizzle-orm';

export async function getUserPosts(db: DrizzleClient, r2: R2Bucket, userId: string) {
  const user = await db.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1);
  if (!user[0]) {
    throw new Response('User not found', { status: 404 });
  }

  const posts = await db.query.postsTable.findMany({
    where: (postsTable, { eq, and, or }) =>
      and(
        eq(postsTable.userId, userId),
        or(isNull(postsTable.analysisResult), eq(postsTable.analysisResult, true))
      ),
    with: {
      user: true,
      likes: {
        where: (likesTable, { eq }) => eq(likesTable.likeType, 'super_like'),
        limit: 1,
        with: {
          user: true
        }
      },
      hashtags: {
        with: {
          tag: true
        }
      }
    }
  });

  return {
    posts: await Promise.all(posts.map((post) => serializePost(r2, post)))
  };
}

export async function getRecommendedPosts(db: DrizzleClient, r2: R2Bucket, userId: string) {
  const likePostIds = (
    await db.query.likesTable.findMany({
      where: eq(likesTable.userId, userId),
      columns: { postId: true }
    })
  ).map((like) => like.postId);

  const recommendedPost = await db.query.postsTable.findFirst({
    where: and(
      eq(postsTable.analysisResult, true),
      not(eq(postsTable.userId, userId)),
      likePostIds.length > 0 ? notInArray(postsTable.id, likePostIds) : undefined
    ),
    orderBy: desc(postsTable.id),
    with: {
      user: true,
      likes: {
        where: (likesTable, { eq }) => eq(likesTable.likeType, 'super_like'),
        orderBy: desc(likesTable.createdAt),
        limit: 1,
        with: {
          user: true
        }
      },
      hashtags: {
        with: {
          tag: true
        }
      }
    }
  });

  if (!recommendedPost) {
    return { post: null };
  }

  return { post: await serializePost(r2, recommendedPost) };
}

export async function getFollowingPosts(db: DrizzleClient, r2: R2Bucket, currentUserId: string) {
  // フォローしているユーザーIDの配列を取得
  const followingUserIds = (
    await db.query.followsTable.findMany({
      where: eq(followsTable.followerId, currentUserId),
      columns: { followeeId: true }
    })
  ).map((follow) => follow.followeeId);
  const hasFollowingUserId = followingUserIds.length > 0;

  if (!hasFollowingUserId) {
    // フォローしているユーザーがいない場合、表示するpostは無い
    return { post: null };
  }

  const [superLikePostIds, myLikesPostIds] = await Promise.all([
    // フォローしているユーザーがスーパーライクしたPostのIDの配列を取得
    db.query.likesTable
      .findMany({
        where: and(
          followingUserIds.length > 0 ? inArray(likesTable.userId, followingUserIds) : undefined,
          eq(likesTable.likeType, 'super_like')
        ),
        columns: { postId: true }
        // distinctOn: likesTable.postId,
      })
      .then((likes) => likes.map((like) => like.postId)),
    // ログインユーザーがいいね/スーパーライクしたPostのIDの配列を取得
    db.query.likesTable
      .findMany({
        where: eq(likesTable.userId, currentUserId),
        columns: { postId: true }
      })
      .then((likes) => likes.map((like) => like.postId))
  ]);
  const hasSuperLikePostId = superLikePostIds.length > 0;
  const hasMyLikesPostId = myLikesPostIds.length > 0;

  const [followingPost, superLikedPost] = await Promise.all([
    // フォロー中ユーザーの投稿でかつ、自分がlike, unlike, super_likeしていない投稿
    db.query.postsTable.findFirst({
      where: and(
        eq(postsTable.analysisResult, true),
        inArray(postsTable.userId, followingUserIds),
        or(
          hasSuperLikePostId ? not(inArray(postsTable.id, superLikePostIds)) : undefined,
          not(eq(postsTable.userId, currentUserId)),
          hasMyLikesPostId ? not(inArray(postsTable.id, myLikesPostIds)) : undefined
        )
      ),
      orderBy: desc(postsTable.id),
      with: {
        user: true,
        likes: {
          where: eq(likesTable.likeType, 'super_like'),
          orderBy: desc(likesTable.createdAt),
          limit: 1,
          with: {
            user: true
          }
        },
        hashtags: {
          with: {
            tag: true
          }
        }
      }
    }),
    // フォロー中ユーザーがスーパーライクして、かつ自分がlike, unlike, super_likeしていない投稿
    db.query.postsTable.findFirst({
      where: and(
        eq(postsTable.analysisResult, true),
        hasSuperLikePostId ? inArray(postsTable.id, superLikePostIds) : undefined,
        or(
          not(eq(postsTable.userId, currentUserId)),
          hasMyLikesPostId ? not(inArray(postsTable.id, myLikesPostIds)) : undefined
        )
      ),
      orderBy: desc(postsTable.id),
      with: {
        user: true,
        likes: {
          where: eq(likesTable.likeType, 'super_like'),
          orderBy: desc(likesTable.createdAt),
          limit: 1,
          with: {
            user: true
          }
        },
        hashtags: {
          with: {
            tag: true
          }
        }
      }
    })
  ]);

  const posts = [followingPost, superLikedPost].flatMap((post) => (post == null ? [] : [post]));

  if (posts.length === 0) {
    return { post: null };
  }

  return {
    post: await serializePost(r2, posts[0])
  };
}
