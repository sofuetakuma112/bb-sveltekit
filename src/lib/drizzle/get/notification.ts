import { notificationsTable, usersTable } from "$lib/server/db/schema";
import { serializeNotification } from "$lib/serializers/notification";
import type { DrizzleClient } from "$lib/types/drizzle";
import { eq, desc, inArray } from "drizzle-orm";

export const getNotifications = async (
  db: DrizzleClient,
  r2: R2Bucket,
  currentUserId: string
) => {
  const [notifications, currentUser] = await Promise.all([
    db.query.notificationsTable.findMany({
      where: eq(notificationsTable.userId, currentUserId),
      orderBy: desc(notificationsTable.createdAt),
      with: {
        notifierUser: true,
      },
    }),
    db.query.usersTable.findFirst({
      where: eq(usersTable.id, currentUserId),
    }),
  ]);

  if (!currentUser) {
    throw new Response("CurrentUser not found", { status: 404 });
  }

  const unreadNotifications = notifications.filter((n) => !n.read);

  await db
    .update(notificationsTable)
    .set({ read: true })
    .where(
      unreadNotifications.length > 0
        ? inArray(
            notificationsTable.id,
            unreadNotifications.map((n) => n.id)
          )
        : undefined
    );

  return {
    notifications: await Promise.all(
      notifications.map((n) => serializeNotification(r2, n))
    ),
  };
};
