import { drizzle } from 'drizzle-orm/d1';
import { faker } from '@faker-js/faker';
import {
  usersTable,
  postsTable,
  likesTable,
  followsTable,
  notificationsTable,
  tagsTable,
  postTagsTable
} from '$lib/server/db/schema';
import * as schema from '$lib/server/db/schema';
import { v4 as uuidv4 } from 'uuid';
import { hashTags } from './const';
import { eq } from 'drizzle-orm';

interface Env {
  DB: D1Database;
}

function getRandomAge() {
  const birthdate = faker.date.birthdate({ min: 18, max: 35, mode: 'age' });
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDiff = today.getMonth() - birthdate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
    age--;
  }

  return age;
}

function getRandomElements(hashTags: string[]) {
  const numElements = Math.floor(Math.random() * 11); // 0から10までのランダムな整数を生成
  const shuffledArray = hashTags.slice().sort(() => 0.5 - Math.random()); // 配列をシャッフル
  return shuffledArray.slice(0, numElements); // ランダムな数の要素を選択して返す
}

async function fetch30PicUrls(): Promise<string[]> {
  const response = await fetch('https://api.waifu.pics/many/sfw/waifu', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });
  const res: {
    files: string[];
  } = await response.json();
  return res.files;
}

export default {
  async fetch(
    request: Request,
    env: Env
    // ctx: ExecutionContext
  ): Promise<Response> {
    const db = drizzle(env.DB, { schema });

    let existSeedImages = true;
    let seedImages: string[] = ((await request.json()) as string[]).filter((fileName) => fileName);

    if (seedImages.length === 0) {
      existSeedImages = false;
      seedImages = (await Promise.all([...Array(4)].flatMap(() => fetch30PicUrls()))).flat();
    }

    // ユーザーデータの作成
    const userData: (typeof usersTable.$inferInsert)[] = [];
    for (let i = 0; i < 20; i++) {
      userData.push({
        name: faker.person.fullName(),
        icon: faker.image.avatar(),
        imageS3Key: faker.image.avatar(),
        provider: 'google',
        providerId: uuidv4(),
        email: faker.internet.email()
      });
    }
    await Promise.all(userData.map((data) => db.insert(usersTable).values(data)));

    // 投稿データの作成
    const postData: (typeof postsTable.$inferInsert)[] = [];
    const userIds = await db.select({ id: usersTable.id }).from(usersTable).all();
    const allPostIds: string[] = [];

    for (let i = 0; i < seedImages.length; i++) {
      const userId = faker.helpers.arrayElement(userIds).id;
      const postId = uuidv4();
      allPostIds.push(postId);

      postData.push({
        id: postId,
        prompt: faker.lorem.sentence(),
        imageS3Key: existSeedImages ? `posts/${seedImages[i].split('.')[0]}` : seedImages[i],
        imageName: faker.person.firstName('female'),
        imageAge: getRandomAge().toString(),
        imageBirthplace: faker.location.country(),
        analysisResult: true,
        userId
      });
    }
    await Promise.all(postData.map((data) => db.insert(postsTable).values(data)));

    // ハッシュタグデータの作成
    const hashTagData: (typeof tagsTable.$inferInsert)[] = [];

    for (let i = 0; i < allPostIds.length; i++) {
      const selectedTags = getRandomElements(hashTags);
      for (const tag of selectedTags) {
        hashTagData.push({
          tag,
          postId: allPostIds[i]
        });
      }
    }

    const tagIdAndPostIds = await Promise.all(
      hashTagData.map(async (data) => {
        await db
          .insert(tagsTable)
          .values({
            name: data.tag
          })
          .onConflictDoNothing({ target: tagsTable.name });
        const row = await db.query.tagsTable.findFirst({
          where: eq(tagsTable.name, data.tag)
        });
        return {
          tagId: row.id,
          postId: data.postId
        };
      })
    );

    await Promise.all(tagIdAndPostIds.map((data) => db.insert(postTagsTable).values(data)));

    // いいねデータの作成
    const likeData: (typeof likesTable.$inferInsert)[] = [];
    const postIds = await db.select({ id: postsTable.id }).from(postsTable).all();
    for (let i = 0; i < 100; i++) {
      const userId = faker.helpers.arrayElement(userIds).id;
      const postId = faker.helpers.arrayElement(postIds).id;
      likeData.push({
        likeType: faker.helpers.arrayElement(['like', 'super_like', 'unlike']),
        userId,
        postId
      });
    }

    await Promise.all(likeData.map((data) => db.insert(likesTable).values(data)));

    // フォローデータの作成
    const followData: (typeof followsTable.$inferInsert)[] = [];
    for (let i = 0; i < 50; i++) {
      const followerId = faker.helpers.arrayElement(userIds).id;
      const followeeId = faker.helpers.arrayElement(userIds).id;
      if (followerId !== followeeId) {
        followData.push({
          followerId,
          followeeId
        });
      }
    }
    await Promise.all(followData.map((data) => db.insert(followsTable).values(data)));

    // 通知データの作成
    const notificationData: (typeof notificationsTable.$inferInsert)[] = [];
    for (let i = 0; i < 200; i++) {
      const userId = faker.helpers.arrayElement(userIds).id;
      const notifierUserId = faker.helpers.arrayElement(userIds).id;
      const postId = Math.random() < 0.8 ? faker.helpers.arrayElement(postIds).id : undefined;

      if (userId !== notifierUserId) {
        notificationData.push({
          notificationType: faker.helpers.arrayElement(['like', 'super_like', 'follow']),
          userId,
          notifierUserId,
          postId
        });
      }
    }

    await Promise.all(notificationData.map((data) => db.insert(notificationsTable).values(data)));

    return Response.json({
      message: 'Seed done'
    });
  }
};
