import { postsTable, usersTable, likesTable, hashtagsTable } from "$lib/server/db/schema";
import type { InferSelectModel } from "drizzle-orm";
import { getImageUrlFromR2 } from "$lib/r2";

export async function serializePost(
  r2: R2Bucket,
  post: InferSelectModel<typeof postsTable> & {
    user: InferSelectModel<typeof usersTable>;
    likes: InferSelectModel<typeof likesTable>[];
    hashtags: InferSelectModel<typeof hashtagsTable>[];
  }
) {
  const imageUrl = await getImageUrlFromR2(r2, post.imageS3Key);

  return {
    id: post.id,
    prompt: post.prompt,
    imageUrl,
    analysisResult: post.analysisResult,
    likeCount: post.likes.filter((l) => l.likeType === "like").length,
    superLikeCount: post.likes.filter((l) => l.likeType === "super_like")
      .length,
    userId: post.userId,
    hashtags: post.hashtags,
    imageName: post.imageName,
    imageAge: post.imageAge,
    imageBirthplace: post.imageBirthplace,
    user: await serializeUser(r2, post.user),
  };
}

export async function serializeUser(
  r2: R2Bucket,
  user: InferSelectModel<typeof usersTable>
) {
  const imageUrl = await getImageUrlFromR2(r2, user.imageS3Key);

  return {
    id: user.id,
    name: user.name,
    imageUrl: imageUrl || user.icon,
  };
}

export type SerializedPost = Awaited<ReturnType<typeof serializePost>>;
export type SerializedUser = Awaited<ReturnType<typeof serializeUser>>;
