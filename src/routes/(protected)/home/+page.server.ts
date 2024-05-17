import { getRecommendedPosts, getFollowingPosts } from '$lib/drizzle/get/post';
import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import * as schema from '$lib/server/db/schema';
import { drizzle } from 'drizzle-orm/d1';
import { setupEvent } from '@/server/setupEvent';

export const load = async (event: ServerLoadEvent) => {
  await setupEvent(event);

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

  // const db = event.locals.db;
  const db = drizzle(event.platform?.env.DB as D1Database, { schema });
  const r2 = event.platform?.env.R2 as R2Bucket;

  const { post } =
    type === 'recommend'
      ? await getRecommendedPosts(db, r2, userId)
      : await getFollowingPosts(db, r2, userId);

  return { type, post };
};
