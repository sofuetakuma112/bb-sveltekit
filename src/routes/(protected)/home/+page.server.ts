import { redirect, type ServerLoadEvent } from '@sveltejs/kit';

export const load = async (event: ServerLoadEvent) => {
  // この関数は、クライアントサイドだけの場合、キャッシュを保持する代わりに、
  // 再度ページをチェックするようにするためです。
  // クライアント側だけの場合、
  // ユーザーがログアウトしてもページが表示される可能性がある。
  const user = event.locals.user;
  if (!user) {
    redirect(302, '/login');
  }
  return user;
};
