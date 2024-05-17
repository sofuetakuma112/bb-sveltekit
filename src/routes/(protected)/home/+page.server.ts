import { getRecommendedPosts, getFollowingPosts } from '$lib/drizzle/get/post';
import { redirect, type ServerLoadEvent } from '@sveltejs/kit';

export const load = async (event: ServerLoadEvent) => {
  // この関数は、クライアントサイドだけの場合、キャッシュを保持する代わりに、
  // 再度ページをチェックするようにするためです。
  // クライアント側だけの場合、
  // ユーザーがログアウトしてもページが表示される可能性がある。
  const currentUser = event.locals.user;
  if (!currentUser) {
    redirect(302, '/login');
  }

  const userId = currentUser.id;

  const type = event.url.searchParams.get('type') ?? 'recommend';

  const db = event.locals.db;
  const r2 = event.platform?.env.R2 as R2Bucket;

  const { post } =
    type === 'recommend'
      ? await getRecommendedPosts(db, r2, userId)
      : await getFollowingPosts(db, r2, userId);

  console.log('post => %o', post);

  return { type, post };
};
