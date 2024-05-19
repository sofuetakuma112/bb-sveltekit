import { getLikePostsCount } from '$lib/drizzle/get/like';
import { getUserPostsCount } from '$lib/drizzle/get/post';
import { getUser } from '$lib/drizzle/get/user';
import { editProfileSchema } from '$lib/form/editProfile';
import { error, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad  = async (event) => {
  const form = await superValidate(zod(editProfileSchema));
  const currentUser = event.locals.user;
    if (!currentUser) {
      redirect(302, '/login');
    }

  if (!event.params.userId) {
    error(400, 'userId is required');
  }

  const db = event.locals.db;
  const r2 = event.platform?.env.R2 as R2Bucket;

  const [userPostsResponse, userResponse, superLikePostsResponse] = await Promise.all([
    getUserPostsCount(db, r2, event.params.userId),
    getUser(db, r2, event.params.userId, currentUser.id),
    getLikePostsCount(db, r2, event.params.userId, currentUser.id, 'super_like')
  ]);

  const { count: postsCount } = userPostsResponse.postsCount[0];
  const { user } = userResponse;
  const { count: likePostsCount } = superLikePostsResponse.likePostsCount[0];

  return {
    postsCount: postsCount,
    likePostsCount: likePostsCount,
    user,
    currentUser,
    form
  };
}
