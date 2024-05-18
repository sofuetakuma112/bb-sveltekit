<script lang="ts">
  import clsx from 'clsx';
  import { writable } from 'svelte/store';
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  import { Card } from '$lib/components/ui/card';
  import type { SerializedPost } from '$lib/serializers/post';

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
    smOutline: 'bg-white-white',
    lgOutline: 'bg-white-white'
  };

  export let tabValue: string;
  export let post: SerializedPost | null;

  const recommendCurrentScrollIndex = writable(0);
  const followingCurrentScrollIndex = writable(0);

  $: currentScrollIndex =
    tabValue === 'recommend' ? $recommendCurrentScrollIndex : $followingCurrentScrollIndex;

  const mutate = () => {
    console.log('mutate!');
  };

  const handleReload = () => {
    // TODO: リロード処理を実装する
    mutate();
  };

  const handleScroll = (type: 'up' | 'down') => {
    // 現在のカードに基づいて次のカードを表示
    if (type === 'up') {
      currentScrollIndex -= 1;
    } else {
      currentScrollIndex += 1;
    }
  };
</script>

{#if post === null}
  <div class="flex h-full items-center justify-center text-xl">表示する女性がいません</div>
{:else}
  <div class="hidden sm:block w-full">
    <Card
      variant="single"
      color={Number(post.superLikeCount) > 0 ? 'superlike' : 'blue'}
      class="relative h-full flex-col sm:max-h-[785px]"
    >
      <!-- User profile -->
      <div
        class={clsx('absolute left-8 top-6 z-10', {
          block: currentScrollIndex === 0,
          hidden: currentScrollIndex > 0
        })}
      >
        <a href={`/${post.user.id}/home`}>
          <div class="mr-1 size-9 overflow-hidden rounded-lg">
            <img
              src={post.user.imageUrl}
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
            <span class="i-ic-baseline-star size-6 sm:size-7"></span>
            <span class="pl-2 text-sm font-bold text-blue-300"> superlikeされた投稿です！！ </span>
          </div>
        {/if}
      </div>

      <!-- Reload button -->
      <div
        class={clsx('absolute right-2 top-2 z-10 sm:right-8 sm:top-6', {
          block: currentScrollIndex === 0,
          hidden: currentScrollIndex > 0
        })}
      >
        <Button variant="smOutline" class={commonClasses.reload} on:click={handleReload}>
          <span class="i-ic-baseline-refresh size-8"></span>
        </Button>
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
          <span class="i-ic-baseline-arrow-upward size-8"></span>
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
          <span class="i-ic-baseline-arrow-downward size-8"></span>
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
            <img src={post.imageUrl} alt="AI画像" class="size-full object-cover" />
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
        <form method="post">
          <input name="postId" type="hidden" value={post.id} />
          <input name="likeType" type="hidden" value="unlike" />
          <Button type="submit" variant="lgOutline" class={buttonVariants.lgOutline}>
            <span class="i-akar-icons-cross size-8"></span>
          </Button>
        </form>

        <form method="post">
          <input name="postId" type="hidden" value={post.id} />
          <input name="likeType" type="hidden" value="super_like" />
          <Button type="submit" variant="lgOutline" class={buttonVariants.lgOutline}>
            <span class="i-ic-baseline-star size-8 sm:size-16"></span>
          </Button>
        </form>

        <form method="post">
          <input name="postId" type="hidden" value={post.id} />
          <input name="likeType" type="hidden" value="like" />
          <Button type="submit" variant="lgOutline" class={buttonVariants.lgOutline}>
            <span class="i-ic-baseline-favorite size-8 sm:size-16"></span>
          </Button>
        </form>
      </div>
    </Card>
  </div>

  <div class="sm:hidden">
    <Card
      variant="single"
      color={Number(post.superLikeCount) > 0 ? 'superlike' : 'blue'}
      class="relative flex h-full flex-col"
    >
      <!-- Image and user info -->
      <div class="scrollbar-hide h-full overflow-y-scroll rounded-3xl">
        <div class="relative flex h-full">
          <div class="flex-1">
            <img src={post.imageUrl} alt="AI画像" class="size-full object-cover" />
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
            class={clsx('absolute left-4 top-4 z-10 flex', {
              block: currentScrollIndex === 0,
              hidden: currentScrollIndex > 0
            })}
          >
            <a href={`/${post.user.id}/home`}>
              <div class={commonClasses.profileImage}>
                <img
                  src={post.user.imageUrl}
                  alt="ユーザープロフィール画像"
                  class="size-full object-cover"
                />
              </div>
            </a>
            <div class="flex items-center">
              <a href={`/${post.user.id}/home`}>
                <span class="text-base text-white">{post.user.name}</span>
              </a>
            </div>
          </div>

          <!-- Action buttons -->
          <div class="absolute bottom-2 right-2 flex gap-x-2">
            <form method="post">
              <input name="postId" type="hidden" value={post.id} />
              <input name="likeType" type="hidden" value="unlike" />
              <Button type="submit" variant="smOutline" class={buttonVariants.smOutline}>
                <span class="i-akar-icons-cross size-6"></span>
              </Button>
            </form>

            <form method="post">
              <input name="postId" type="hidden" value={post.id} />
              <input name="likeType" type="hidden" value="super_like" />
              <Button type="submit" variant="smOutline" class={buttonVariants.smOutline}>
                <span class="i-ic-baseline-star size-6"></span>
              </Button>
            </form>

            <form method="post">
              <input name="postId" type="hidden" value={post.id} />
              <input name="likeType" type="hidden" value="like" />
              <Button type="submit" variant="smOutline" class={buttonVariants.smOutline}>
                <span class="i-ic-baseline-favorite size-6"></span>
              </Button>
            </form>
          </div>

          <!-- Superlike badge -->
          <div
            class={clsx('absolute left-4 top-14 z-10', {
              block: currentScrollIndex === 0,
              hidden: currentScrollIndex > 0
            })}
          >
            {#if Number(post.superLikeCount) > 0}
              <div class={commonClasses.superLikeIcon}>
                <!-- <Icon name="super-like" width="32" height="32" /> -->
                <span class="i-ic-baseline-star size-8"></span>
                <span class="pl-2 text-sm font-bold text-blue-300">
                  superlikeされた投稿です！！
                </span>
              </div>
            {/if}
          </div>

          <!-- Reload button -->
          <div
            class={clsx('absolute right-2 top-2 z-10', {
              block: currentScrollIndex === 0,
              hidden: currentScrollIndex > 0
            })}
          >
            <Button variant="smOutline" class={commonClasses.reload} on:click={handleReload}>
              <span class="i-ic-baseline-refresh size-8"></span>
            </Button>
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
          <p
            class="mt-9 rounded-2xl bg-white p-6 text-base font-semibold text-slate-800 sm:text-xl"
          >
            {post.prompt}
          </p>
        </div>
      </div>
    </Card>
  </div>
{/if}
