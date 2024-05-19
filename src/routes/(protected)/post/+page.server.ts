import { redirect, fail } from '@sveltejs/kit';
import { postTagsTable, postsTable, tagsTable } from '$lib/server/db/schema';
import { uploadImageToR2 } from '$lib/r2';
import { zod } from 'sveltekit-superforms/adapters';
import { postSchema } from '$lib/form/post';
import { superValidate, withFiles } from 'sveltekit-superforms/server';
import { inArray } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const form = await superValidate(zod(postSchema));
  return { form };
};

export const actions = {
  default: async (event) => {
    const currentUser = event.locals.user;
    if (!currentUser) {
      redirect(302, '/login');
    }

    const userId = currentUser.id;

    const form = await superValidate(event.request, zod(postSchema));
    if (!form.valid) {
      return fail(400, withFiles({ form }));
    }

    const key = await uploadImageToR2(event.platform?.env.R2 as R2Bucket, form.data.file, 'posts');

    const imageName = form.data.imageName;
    const imageAge = form.data.imageAge;
    const prompt = form.data.prompt;
    const hashtag = form.data.hashtag;

    const trimmedHashtags =
      hashtag == null
        ? []
        : hashtag
            .trim()
            .split('#')
            .filter((tag) => tag !== '')
            .map((tag) => tag.trim());

    try {
      // TODO: トランザクションで行うよう修正する
      let tags: { id: string }[] = [];
      if (trimmedHashtags.length !== 0) {
        await event.locals.db
          .insert(tagsTable)
          .values(
            trimmedHashtags.map((tag) => ({
              name: tag
            }))
          )
          .onConflictDoNothing({ target: tagsTable.name });

        tags = await event.locals.db.query.tagsTable.findMany({
          columns: {
            id: true
          },
          where: inArray(tagsTable.name, trimmedHashtags)
        });
      }

      const postIds = await event.locals.db
        .insert(postsTable)
        .values({
          imageS3Key: key,
          imageName,
          imageAge,
          prompt,
          userId,
          analysisResult: true
        })
        .returning({ postId: postsTable.id });
      const postId = postIds[0].postId;

      if (tags.length !== 0) {
        await event.locals.db.insert(postTagsTable).values(
          tags.map((tag) => ({
            postId,
            tagId: tag.id
          }))
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }

      return fail(500, withFiles({ form }));
    }

    return redirect(302, `/${userId}/home`);
  }
};
