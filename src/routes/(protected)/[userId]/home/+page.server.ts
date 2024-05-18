import { editProfileSchema } from '$lib/form/editProfile';
import { uploadImageToR2 } from '$lib/r2';
import { usersTable, postsTable } from '$lib/server/db/schema';
import { protectedRouteLoad, setupEvent } from '$lib/server/setupEvent';
import { getLikePosts } from '@/drizzle/get/like';
import { getUserPosts } from '@/drizzle/get/post';
import { error, fail, json, redirect } from '@sveltejs/kit';
import { eq, and } from 'drizzle-orm';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate, withFiles } from 'sveltekit-superforms/server';

export const load = protectedRouteLoad(async (event, currentUser) => {
  if (!event.params.userId) {
    error(400, 'userId is required');
  }

  const type = event.url.searchParams.get('type') ?? '';

  const db = event.locals.db;
  const r2 = event.platform?.env.R2 as R2Bucket;

  const { posts } =
    type === 'super-like'
      ? await getLikePosts(db, r2, event.params.userId, currentUser.id, 'super_like')
      : await getUserPosts(db, r2, event.params.userId);

  return { posts, currentUser };
});

export const actions = {
  updateUser: async (event) => {
    await setupEvent(event);
    const currentUser = event.locals.user;
    if (!currentUser) {
      redirect(302, '/login');
    }

    const form = await superValidate(event.request, zod(editProfileSchema));
    if (!form.valid) {
      return fail(400, { form });
    }

    const foundUser = await event.locals.db.query.usersTable.findFirst({
      where: eq(usersTable.id, currentUser.id)
    });
    if (!foundUser) {
      return json({ message: 'user not found' }, { status: 404 });
    }

    const formData = form.data;
    const file = formData.file;

    let key;
    if (file && file.size !== 0) {
      key = await uploadImageToR2(event.platform?.env.R2 as R2Bucket, file, 'avatars');
    }

    const userName = formData.name;

    if (userName === foundUser.name && !key) {
      return withFiles({ form });
    }

    await event.locals.db
      .update(usersTable)
      .set({
        name: userName ?? foundUser.name,
        imageS3Key: key
      })
      .where(eq(usersTable.id, currentUser.id));

    return withFiles({ form });
  },
  deletePost: async (event) => {
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
    const post = await event.locals.db.query.postsTable.findFirst({
      where: and(eq(postsTable.id, postId), eq(postsTable.userId, currentUser.id))
    });

    if (!post) {
      return new Response('Post not found', { status: 404 });
    }

    await event.locals.db.delete(postsTable).where(eq(postsTable.id, post.id));

    return { success: true };
  }
};
