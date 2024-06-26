<script lang="ts">
  import clsx from 'clsx';
  import { writable } from 'svelte/store';
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  import { Card } from '$lib/components/ui/card';
  import type { SerializedPost } from '$lib/server/serializers/post';
  import StarIcon from '$lib/components/icons/StarIcon.svelte';
  import ArrowUpIcon from '$lib/components/icons/ArrowUpIcon.svelte';
  import ArrowDownIcon from '$lib/components/icons/ArrowDownIcon.svelte';
  import HeartIcon from '$lib/components/icons/HeartIcon.svelte';
  import { constructImageUrl } from '$lib/url';
  import { invalidate } from '$app/navigation';

  const commonClasses = {
    profileImage: 'size-9 overflow-hidden rounded-lg',
    userName: 'text-base text-black-black',
    superLikeIcon: 'flex items-center',
    reload: 'bg-white-white',
    scrollButton: 'bg-white-white',
    scrollIcon: 'size-[18px] sm:size-[28px]',
    hashtags: 'inline-flex flex-wrap gap-x-3 gap-y-6 pt-9',
    promptText: 'mt-9 rounded-2xl bg-white p-6 text-xl font-semibold text-slate-800'
  };

  const buttonVariants = {
    lgOutline: 'bg-white-white'
  };

  export let tabValue: string;
  export let posts: SerializedPost[];

  let currentIndex = 0;

  const recommendCurrentScrollIndex = writable(0);
  const followingCurrentScrollIndex = writable(0);

  $: currentScrollIndex =
    tabValue === 'recommend' ? $recommendCurrentScrollIndex : $followingCurrentScrollIndex;
  $: post = posts[currentIndex];

  const handleScroll = (type: 'up' | 'down') => {
    // 現在のカードに基づいて次のカードを表示
    if (type === 'up') {
      currentScrollIndex -= 1;
    } else {
      currentScrollIndex += 1;
    }
  };

  const fetchCreateLike = async (postId: string, likeType: 'unlike' | 'super_like' | 'like') =>
    fetch('/api/like/create', {
      method: 'POST',
      body: JSON.stringify({ postId, likeType }),
      headers: {
        'content-type': 'application/json'
      }
    });

  async function createLike(postId: string, likeType: 'unlike' | 'super_like' | 'like') {
    const nextIndex = currentIndex + 1;
    const isLast = nextIndex === posts.length;

    if (isLast) {
      await fetchCreateLike(postId, likeType);
      await invalidate('swipe:allPosts');
      currentIndex = 0;
      return;
    }

    currentIndex += 1;

    fetchCreateLike(postId, likeType);
  }
</script>

{#if post == null}
  <div class="flex h-full items-center justify-center text-xl">表示する女性がいません</div>
{:else}
  <div class="flex justify-center w-full">
    <Card
      variant="single"
      color={Number(post.superLikeCount) > 0 ? 'superlike' : 'blue'}
      class="relative h-full flex-col sm:max-h-[785px]"
    >
      <!-- User profile -->
      <div
        class={clsx('absolute left-8 top-6 z-10', {
          'flex gap-x-2 flex-row': currentScrollIndex === 0,
          hidden: currentScrollIndex > 0
        })}
      >
        <a href={`/${post.user.id}/home`}>
          <div class="mr-1 size-9 overflow-hidden rounded-lg">
            <img
              src={constructImageUrl(post.user.imageUrl ?? '', {
                width: 72
              })}
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

      <!-- Superlike badge -->
      <div
        class={clsx('absolute left-1/2 top-6 z-10 -translate-x-1/2', {
          block: currentScrollIndex === 0,
          hidden: currentScrollIndex > 0
        })}
      >
        {#if Number(post.superLikeCount) > 0}
          <div class={commonClasses.superLikeIcon}>
            <StarIcon class="size-6 sm:size-7 bg-[#25AADA]" />
            <span class="pl-2 text-sm font-bold text-blue-300"> superlikeされた投稿です！！ </span>
          </div>
        {/if}
      </div>

      <!-- Scroll up button -->
      <div
        class={clsx('absolute left-1/2 top-[10%] z-10 -translate-x-1/2', {
          'sm:hidden': currentScrollIndex === 0
        })}
      >
        <Button
          variant="ghost"
          class={commonClasses.scrollButton}
          on:click={() => handleScroll('up')}
        >
          <ArrowUpIcon class="size-8 bg-[#25AADA]" />
        </Button>
      </div>

      <!-- Scroll down button -->
      <div
        class={clsx('absolute bottom-[15%] left-1/2 z-10 -translate-x-1/2', {
          'sm:hidden': currentScrollIndex === 2
        })}
      >
        <Button
          variant="ghost"
          class={commonClasses.scrollButton}
          on:click={() => handleScroll('down')}
        >
          <ArrowDownIcon class="size-8 bg-[#25AADA]" />
        </Button>
      </div>

      <!-- Image and user info -->
      <div class="h-full overflow-y-hidden rounded-3xl">
        <div
          class={clsx('flex h-full transition-transform duration-500', {
            'translate-y-0': currentScrollIndex === 0,
            '-translate-y-full': currentScrollIndex === 1,
            'translate-y-[-200%]': currentScrollIndex === 2
          })}
        >
          <div class="flex-1 w-1/2">
            <img
              src={constructImageUrl(post.imageUrl, {
                width: 530
              })}
              alt="AI画像"
              class="size-full object-cover"
            />
          </div>
          <div class="flex flex-1 items-center justify-center w-1/2 px-2 sm:px-4">
            <div class="my-auto">
              <span class="pr-4 text-5xl text-white-white break-all">
                {post.imageName}
              </span>
              <span class="text-4xl text-white-white">
                {Number(post.imageAge)}
              </span>
            </div>
          </div>
        </div>

        <!-- Hashtags -->
        <div
          class={clsx(
            'flex h-full flex-col items-center justify-center px-8 transition-transform duration-500 xl:px-32',
            {
              '-translate-y-full': currentScrollIndex === 1,
              'translate-y-[-200%]': currentScrollIndex === 2
            }
          )}
        >
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
        <div
          class={clsx(
            'flex h-full flex-col items-center justify-center px-8 transition-transform duration-500 xl:px-32',
            {
              '-translate-y-full': currentScrollIndex === 1,
              'translate-y-[-200%]': currentScrollIndex === 2
            }
          )}
        >
          <p class="text-center text-2xl font-bold">プロンプト</p>
          <p class={commonClasses.promptText}>{post.prompt}</p>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 gap-x-16 sm:-bottom-12 sm:flex">
        <Button
          type="submit"
          variant="lgOutline"
          class={buttonVariants.lgOutline}
          on:click={() => createLike(post.id, 'unlike')}
        >
          <span class="i-akar-icons-cross size-8"></span>
        </Button>

        <Button
          type="submit"
          variant="lgOutline"
          class={buttonVariants.lgOutline}
          on:click={() => createLike(post.id, 'super_like')}
        >
          <StarIcon class="size-8 sm:size-16 bg-[#25AADA]" />
        </Button>

        <Button
          type="submit"
          variant="lgOutline"
          class={buttonVariants.lgOutline}
          on:click={() => createLike(post.id, 'like')}
        >
          <HeartIcon class="size-8 sm:size-16 bg-[#25AADA]" />
        </Button>
      </div>
    </Card>
  </div>
{/if}
