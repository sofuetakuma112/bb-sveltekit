import { followsTable } from '@/server/db/schema';
import { setupEvent } from '@/server/setupEvent.js';
import { redirect } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

export const actions = {
  create: async (event) => {
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

    await event.locals.db.insert(followsTable).values({
      followeeId: userId,
      followerId: currentUser.id
    });

    return { success: true };
  },
  delete: async (event) => {
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
