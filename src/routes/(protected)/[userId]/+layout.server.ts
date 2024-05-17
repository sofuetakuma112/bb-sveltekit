import { getLikePosts } from '@/drizzle/get/like';
import { getUserPosts } from '@/drizzle/get/post';
import { getUser } from '@/drizzle/get/user';
import { editProfileSchema } from '@/form/editProfile';
import { redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async (event) => {
  const currentUser = event.locals.user;
  if (!currentUser) {
    redirect(302, '/login');
  }

  const form = await superValidate(zod(editProfileSchema));

  const db = event.locals.db;
  const r2 = event.platform?.env.R2 as R2Bucket;

  const [userPostsResponse, userResponse, superLikePostsResponse] = await Promise.all([
    getUserPosts(db, r2, event.params.userId),
    getUser(db, r2, event.params.userId, currentUser.id),
    getLikePosts(db, r2, event.params.userId, currentUser.id, 'super_like')
  ]);

  const { posts } = userPostsResponse;
  const { user } = userResponse;
  const { posts: superLikePosts } = superLikePostsResponse;

  return { posts, superLikePosts, user, currentUser, form };
};
