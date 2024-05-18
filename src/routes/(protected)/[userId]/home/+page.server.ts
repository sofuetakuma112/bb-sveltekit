import { editProfileSchema } from '@/form/editProfile';
import { uploadImageToR2 } from '@/r2';
import { usersTable, followsTable } from '@/server/db/schema';
import { protectedRouteLoad, setupEvent } from '@/server/setupEvent';
import { error, fail, json, redirect } from '@sveltejs/kit';
import { eq, and } from 'drizzle-orm';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate, withFiles } from 'sveltekit-superforms/server';

export const load = protectedRouteLoad((event, currentUser) => {
  if (!event.params.userId) {
    error(400, 'userId is required');
  }

  return { currentUser };
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

    const formData = form.data;

    const foundUser = await event.locals.db.query.usersTable.findFirst({
      where: eq(usersTable.id, currentUser.id)
    });
    if (!foundUser) {
      return json({ message: 'user not found' }, { status: 404 });
    }

    const file = formData.file;

    let key;
    if (file && file.size !== 0) {
      key = await uploadImageToR2(event.platform?.env.R2 as R2Bucket, file, 'avatars');
    }

    const userName = formData.name;

    if (userName === foundUser.name && !key) {
      return json({ message: 'no changed' }, { status: 200 });
    }

    await event.locals.db
      .update(usersTable)
      .set({
        name: userName ?? foundUser.name,
        imageS3Key: key
      })
      .where(eq(usersTable.id, currentUser.id));

      return withFiles({ form })
  },
  deletePost: async (event) => {
    await setupEvent(event);
    const currentUser = event.locals.user;
    if (!currentUser) {
      redirect(302, '/login');
    }

    const data = await event.request.formData();
    const userId = data.get('userId')?.toString();
    if (userId == null) {
      return new Response('userId is required', { status: 400 });
    }

    const follow = await event.locals.db.query.followsTable.findFirst({
      where: and(eq(followsTable.followeeId, userId), eq(followsTable.followerId, currentUser.id))
    });

    if (!follow) {
      return new Response('Follow not found', { status: 404 });
    }

    await event.locals.db.delete(followsTable).where(eq(followsTable.id, follow.id));

    return { success: true };
  }
};
