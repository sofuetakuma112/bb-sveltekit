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

  return { currentUser };
};
