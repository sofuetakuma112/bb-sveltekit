import { relations, sql } from 'drizzle-orm';
import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  provider: text('provider').notNull(),
  providerId: text('provider_id').notNull().unique(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  icon: text('icon'),
  imageS3Key: text('image_s3_key'),
  token: text('token').unique(),
  // verified: integer('verified', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(current_timestamp)`)
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  posts: many(postsTable),
  notifications: many(notificationsTable, {
    relationName: 'userNotificationsToUsers'
  }),
  likes: many(likesTable),
  followers: many(followsTable, { relationName: 'asFollower' }),
  followees: many(followsTable, { relationName: 'asFollowee' })
}));

export const sessionsTable = sqliteTable('sessions', {
  id: text('id').notNull().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.id),
  expiresAt: integer('expires_at').notNull()
});

// Posts
export const postsTable = sqliteTable('posts', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  prompt: text('prompt').notNull(),
  imageS3Key: text('image_s3_key'),
  analysisScore: integer('analysis_score'),
  analysisResult: integer('analysis_result', { mode: 'boolean' }),
  modelVersion: text('model_version'),
  //   hashtags: text('hash_tags', { mode: 'json' }).default(sql`(json_array())`),
  imageName: text('image_name').notNull(),
  imageAge: text('image_age').notNull(),
  imageBirthplace: text('image_birthplace'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(current_timestamp)`),
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.id)
});

export const postsRelations = relations(postsTable, ({ one, many }) => ({
  likes: many(likesTable),
  user: one(usersTable, {
    // リレーション先
    fields: [postsTable.userId], // リレーション元
    references: [usersTable.id] // リレーション先
  }),
  hashtags: many(postTagsTable)
}));

export const tagsTable = sqliteTable('tags', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull().unique()
});

export const tagsRelations = relations(tagsTable, ({ many }) => ({
  posts: many(postTagsTable)
}));

export const postTagsTable = sqliteTable('post_tags', {
  postId: text('post_id')
    .notNull()
    .references(() => postsTable.id, { onDelete: 'cascade' }),
  tagId: text('tag_id')
    .notNull()
    .references(() => tagsTable.id, { onDelete: 'cascade' }),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.postId, table.tagId] }),
    // pkWithCustomName: primaryKey({ name: 'custom_name', columns: [table.postId, table.tagId] }),
  };
});

export const postTagsRelations = relations(postTagsTable, ({ one }) => ({
  post: one(postsTable, { fields: [postTagsTable.postId], references: [postsTable.id] }),
  tag: one(tagsTable, { fields: [postTagsTable.tagId], references: [tagsTable.id] })
}));

// Likes
export const likesTable = sqliteTable('likes', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  likeType: text('like_type').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(current_timestamp)`),
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.id),
  postId: text('post_id')
    .notNull()
    .references(() => postsTable.id, { onDelete: 'cascade' })
});

export const likesRelations = relations(likesTable, ({ one }) => ({
  post: one(postsTable, {
    fields: [likesTable.postId],
    references: [postsTable.id]
  }),
  user: one(usersTable, {
    fields: [likesTable.userId],
    references: [usersTable.id]
  })
}));

// Follows
export const followsTable = sqliteTable('follows', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(current_timestamp)`),
  followerId: text('follower_id')
    .notNull()
    .references(() => usersTable.id),
  followeeId: text('followee_id')
    .notNull()
    .references(() => usersTable.id)
});

export const followsRelations = relations(followsTable, ({ one }) => ({
  follower: one(usersTable, {
    fields: [followsTable.followerId],
    references: [usersTable.id],
    relationName: 'asFollowee'
  }),
  followee: one(usersTable, {
    fields: [followsTable.followeeId],
    references: [usersTable.id],
    relationName: 'asFollower'
  })
}));

// Notifications
export const notificationsTable = sqliteTable('notifications', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  notificationType: text('notification_type').notNull(),
  read: integer('read', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(current_timestamp)`),
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.id),
  notifierUserId: text('notifier_user_id')
    .notNull()
    .references(() => usersTable.id),
  postId: text('post_id').references(() => postsTable.id, {
    onDelete: 'cascade'
  })
});

export const notificationsRelations = relations(notificationsTable, ({ one }) => ({
  user: one(usersTable, {
    // リレーション先
    fields: [notificationsTable.userId], // リレーション元
    references: [usersTable.id], // リレーション先
    relationName: 'userNotificationsToUsers'
  }),
  notifierUser: one(usersTable, {
    // リレーション先
    fields: [notificationsTable.notifierUserId], // リレーション元
    references: [usersTable.id], // リレーション先
    relationName: 'notifierUserNotificationsToUsers'
  }),
  post: one(postsTable, {
    // リレーション先
    fields: [notificationsTable.postId], // リレーション元
    references: [postsTable.id], // リレーション先
    relationName: 'postNotificationsToPosts'
  })
}));

export type User = typeof usersTable.$inferInsert;
export type UpdateUser = Partial<typeof usersTable.$inferInsert>;
export type Session = typeof sessionsTable.$inferInsert;
