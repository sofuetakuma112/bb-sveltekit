import { getLikePosts } from '$lib/drizzle/get/like';
import { likesTable } from '$lib/server/db/schema';
import { protectedRouteLoad, setupEvent } from '$lib/server/setupEvent';
import { error, redirect } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

export const load = protectedRouteLoad(async (event) => {
  const currentUser = event.locals.user;
  if (!currentUser) {
    redirect(302, '/login');
  }

  if (!event.params.userId) {
    error(400, 'userId is required');
  }

  const db = event.locals.db;
  const r2 = event.platform?.env.R2 as R2Bucket;

  const likePosts = await getLikePosts(db, r2, event.params.userId, currentUser.id, 'like');

  return { posts: likePosts.posts };
});

export const actions = {
  default: async (event) => {
    await setupEvent(event);
    const currentUser = event.locals.user;
    if (!currentUser) {
      redirect(302, '/login');
    }

    const data = await event.request.formData();
    const postId = data.get('postId')?.toString();
    if (postId == null) {
      return new Response('postId is required', { status: 400 });
    }

    // ログインユーザーの投稿かチェック
    const like = await event.locals.db.query.likesTable.findFirst({
      where: and(eq(likesTable.postId, postId), eq(likesTable.userId, currentUser.id))
    });

    if (!like) {
      return new Response('Like not found', { status: 404 });
    }

    await event.locals.db
      .update(likesTable)
      .set({
        likeType: 'unlike'
      })
      .where(eq(likesTable.id, like.id));

    return { success: true };
  }
};
