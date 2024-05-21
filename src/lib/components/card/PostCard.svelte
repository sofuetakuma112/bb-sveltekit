<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import PromptDialog from '$lib/components/dialog/PromptDialog.svelte';
  import DeletePostButton from '$lib/components/dialog/DeletePostButton.svelte';
  import RemoveLikeButton from '$lib/components/button/RemoveLikeButton.svelte';
  import { Card } from '$lib/components/ui/card';
  import { cn } from '$lib/utils';

  export let imageUrl: string;
  export let imageName: string;
  export let profileUrl: string;
  export let currentUserId: string | undefined;
  export let userId: string;
  export let userName: string;
  export let postId: string | undefined;
  export let analysisResult: boolean | null = null;
  export let pageType: 'likes' | 'posts' = 'posts';
  export let hashtags: {
    id: string;
    name: string;
  }[] = [];
  export let prompt: string;

  const isUnderReviewPost = currentUserId !== userId && analysisResult === null;
</script>

<Card
  variant="post"
  color="transparent"
  class={cn(
    'flex flex-col sm:flex-col-6 sm:max-w-[50%] lg:flex-col-4 lg:max-w-[33.333333%] mt-3 pt-3 px-3',
    {
      hidden: analysisResult === false
    }
  )}
>
  <div class="relative size-full rounded-xl overflow-hidden">
    <PromptDialog {imageUrl} {hashtags} {prompt} {isUnderReviewPost} />
    {#if currentUserId === userId && pageType === 'posts' && postId}
      <DeletePostButton {postId} />
    {/if}
    {#if pageType === 'likes' && postId}
      <RemoveLikeButton {postId} />
    {/if}
    <div class="absolute w-full left-0 bottom-0 flex justify-between h-[64px] bg-image-shadow p-4">
      <div class="flex items-end">
        <a href={`/${userId}/home`}>
          <div class="mr-3 h-6 w-6 overflow-hidden rounded-full">
            <img
              src={`${profileUrl}?w=24`}
              alt="ユーザープロフィール画像"
              class="object-cover w-full h-full"
            />
          </div>
        </a>
        <div class="flex items-center">
          <a href={`/${userId}/home`}>
            <span class="text-base text-[#FFFFFFE6]">{userName}</span>
          </a>
        </div>
      </div>
      <p class="text-lg font-semibold text-[#FFFFFFE6] flex items-end">{imageName}</p>
    </div>
  </div>
</Card>
