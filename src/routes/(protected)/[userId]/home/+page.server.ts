import { getUserPosts } from '$lib/drizzle/get/post';
import { getLikePosts } from '@/drizzle/get/like';
import { getUser } from '@/drizzle/get/user';
import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export const load = async (event: ServerLoadEvent) => {
  // この関数は、クライアントサイドだけの場合、キャッシュを保持する代わりに、
  // 再度ページをチェックするようにするためです。
  // クライアント側だけの場合、
  // ユーザーがログアウトしてもページが表示される可能性がある。
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
    getUserPosts(db, r2, event.params.userId),
    getUser(db, r2, event.params.userId, currentUser.id),
    getLikePosts(db, r2, event.params.userId, currentUser.id, 'super_like')
  ]);

  const { posts } = userPostsResponse;
  const { user } = userResponse;
  const { posts: superLikePosts } = superLikePostsResponse;

  return { posts, superLikePosts, user, currentUser };
};
