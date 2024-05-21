<script lang="ts">
  import clsx from 'clsx';
  import { writable } from 'svelte/store';
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  import { Card } from '$lib/components/ui/card';
  import type { SerializedPost } from '$lib/server/serializers/post';
  import StarIcon from '$lib/components/icons/StarIcon.svelte';
  import HeartIcon from '$lib/components/icons/HeartIcon.svelte';
  import { enhance } from '$app/forms';

  const commonClasses = {
    profileImage: 'size-9 overflow-hidden rounded-lg',
    userName: 'text-base text-white',
    superLikeIcon: 'flex items-center',
    reload: 'bg-white-white',
    hashtags: 'inline-flex flex-wrap gap-x-3 gap-y-6 pt-9',
    promptText: 'mt-9 rounded-2xl bg-white p-6 text-base font-semibold text-slate-800 sm:text-xl'
  };

  const buttonVariants = {
    smOutline: 'bg-white-white'
  };

  export let tabValue: string;
  export let post: SerializedPost | null;

  const recommendCurrentScrollIndex = writable(0);
  const followingCurrentScrollIndex = writable(0);

  $: currentScrollIndex =
    tabValue === 'recommend' ? $recommendCurrentScrollIndex : $followingCurrentScrollIndex;
</script>

{#if post === null}
  <div class="flex h-full items-center justify-center text-xl">表示する女性がいません</div>
{:else}
  <Card
    variant="single"
    color={Number(post.superLikeCount) > 0 ? 'superlike' : 'blue'}
    class="relative flex h-full flex-col"
  >
    <!-- Image and user info -->
    <div class="scrollbar-hide h-full overflow-y-scroll rounded-3xl">
      <div class="relative flex h-full">
        <div class="flex-1">
          <img src={`${post.imageUrl}?w=360&q=80`} alt="AI画像" class="size-full object-cover" />
        </div>
        <div class="absolute bottom-4 left-4">
          <span class="pr-4 text-2xl font-semibold text-white">
            {post.imageName}
          </span>
          <span class="text-xl font-semibold text-white">
            {Number(post.imageAge)}
          </span>
        </div>

        <!-- User profile -->
        <div
          class={clsx('absolute left-4 top-4 z-10', {
            'flex flex-col': currentScrollIndex === 0,
            hidden: currentScrollIndex > 0
          })}
        >
          <a href={`/${post.user.id}/home`}>
            <div class={commonClasses.profileImage}>
              <img
                src={`${post.user.imageUrl}?w=36&q=80`}
                alt="ユーザープロフィール画像"
                class="size-full object-cover"
              />
            </div>
          </a>
          <div class="flex items-center">
            <a href={`/${post.user.id}/home`}>
              <span class={commonClasses.userName}>{post.user.name}</span>
            </a>
          </div>
        </div>

        <!-- Action buttons -->
        <div class="absolute bottom-2 right-2 flex gap-x-2">
          <form method="post" use:enhance>
            <input name="postId" type="hidden" value={post.id} />
            <input name="likeType" type="hidden" value="unlike" />
            <Button type="submit" variant="smOutline" class={buttonVariants.smOutline}>
              <span class="i-akar-icons-cross size-6"></span>
            </Button>
          </form>

          <form method="post" use:enhance>
            <input name="postId" type="hidden" value={post.id} />
            <input name="likeType" type="hidden" value="super_like" />
            <Button type="submit" variant="smOutline" class={buttonVariants.smOutline}>
              <StarIcon class="size-6 bg-[#25AADA]" />
            </Button>
          </form>

          <form method="post" use:enhance>
            <input name="postId" type="hidden" value={post.id} />
            <input name="likeType" type="hidden" value="like" />
            <Button type="submit" variant="smOutline" class={buttonVariants.smOutline}>
              <HeartIcon class="size-6 bg-[#25AADA]" />
            </Button>
          </form>
        </div>

        <!-- Superlike badge -->
        <div
          class={clsx('absolute left-1/2 top-4 z-10 -translate-x-1/2 whitespace-nowrap', {
            block: currentScrollIndex === 0,
            hidden: currentScrollIndex > 0
          })}
        >
          {#if Number(post.superLikeCount) > 0}
            <div class={commonClasses.superLikeIcon}>
              <StarIcon class="size-8 bg-[#25AADA]" />
              <span class="pl-2 text-sm font-bold text-blue-300">
                superlikeされた投稿です！！
              </span>
            </div>
          {/if}
        </div>
      </div>

      <!-- Hashtags -->
      <div class="flex h-full flex-col items-center justify-center px-8">
        <p class="text-center text-2xl font-bold">ハッシュタグ</p>
        <div class={commonClasses.hashtags}>
          {#each post.hashtags as hashTag, i (hashTag.id)}
            <Badge>
              {hashTag.name}
            </Badge>
          {/each}
        </div>
      </div>

      <!-- Prompt -->
      <div class="flex h-full flex-col items-center px-2 pt-4 sm:px-8 sm:pt-8">
        <p class="text-center text-2xl font-bold">プロンプト</p>
        <p class={commonClasses.promptText}>{post.prompt}</p>
      </div>
    </div>
  </Card>
{/if}
