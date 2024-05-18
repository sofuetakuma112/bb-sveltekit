import { hashtagsTable, likesTable, postsTable, usersTable } from '$lib/server/db/schema';
import { getImageUrlFromR2 } from '$lib/r2';
import type { InferSelectModel } from 'drizzle-orm';

export async function serializeLike(
  r2: R2Bucket,
  like: InferSelectModel<typeof likesTable> & {
    post: InferSelectModel<typeof postsTable> & {
      user: InferSelectModel<typeof usersTable>;
      likes: InferSelectModel<typeof likesTable>[];
      hashtags: InferSelectModel<typeof hashtagsTable>[];
    };
  }
) {
  const imageUrl = getImageUrlFromR2(like.post.imageS3Key);

  return {
    id: like.post.id,
    prompt: like.post.prompt,
    imageUrl,
    analysisResult: like.post.analysisResult,
    likeCount: like.post.likes.filter((l) => l.likeType === 'like').length,
    superLikeCount: like.post.likes.filter((l) => l.likeType === 'super_like').length,
    userId: like.post.userId,
    hashtags: like.post.hashtags,
    imageName: like.post.imageName,
    imageAge: like.post.imageAge,
    imageBirthplace: like.post.imageBirthplace,
    user: await serializeUser(r2, like.post.user),
    superLikeUser: like.likeType === 'super_like' ? like.post.user : null
  };
}

export async function serializeUser(r2: R2Bucket, user: InferSelectModel<typeof usersTable>) {
  const imageUrl = getImageUrlFromR2(user.imageS3Key);

  return {
    id: user.id,
    name: user.name,
    imageUrl: imageUrl || user.icon
  };
}

export type SerializedLikedPost = Awaited<ReturnType<typeof serializeLike>>;
export type SerializedUser = Awaited<ReturnType<typeof serializeUser>>;
