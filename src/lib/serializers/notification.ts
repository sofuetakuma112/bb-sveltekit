import { notificationsTable, usersTable } from "$lib/server/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { getImageUrlFromR2 } from "$lib/r2";
import { AppLoadContext } from "@remix-run/cloudflare";

export async function serializeNotification(
  r2: R2Bucket,
  notification: InferSelectModel<typeof notificationsTable> & {
    notifierUser: InferSelectModel<typeof usersTable>;
  }
) {
  return {
    id: notification.id,
    notificationType: notification.notificationType,
    read: notification.read,
    createdAt: notification.createdAt,
    updatedAt: notification.updatedAt,
    notifierUser: await serializeUser(context, notification.notifierUser),
  };
}

async function serializeUser(
  r2: R2Bucket,
  user: InferSelectModel<typeof usersTable>
) {
  const imageUrl = await getImageUrlFromR2(context, user.imageS3Key);
  return {
    id: user.id,
    name: user.name,
    imageUrl: imageUrl || user.icon,
    createdAt: user.createdAt,
    // updatedAt: user.updatedAt,
  };
}

export type SerializedNotification = Awaited<
  ReturnType<typeof serializeNotification>
>;
export type SerializedNotifierUser = Awaited<ReturnType<typeof serializeUser>>;
