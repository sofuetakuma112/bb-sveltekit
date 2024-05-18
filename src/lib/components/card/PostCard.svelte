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

  console.log('hashtags => %o', hashtags);

  const isUnderReviewPost = currentUserId !== userId && analysisResult === null;
</script>

<Card
  variant="list"
  color="transparent"
  class={cn('mx-auto flex flex-col', {
    hidden: analysisResult === false
  })}
>
  <div class="relative h-[270px] pb-1">
    <PromptDialog {imageUrl} {hashtags} {prompt} {isUnderReviewPost} />
    {#if currentUserId === userId && pageType === 'posts' && postId}
      <DeletePostButton {postId} />
    {/if}
    {#if pageType === 'likes' && postId}
      <RemoveLikeButton {postId} />
    {/if}
  </div>
  <p class="pb-1 text-lg font-semibold">{imageName}</p>
  <div class="flex">
    <a href={`/${userId}/home`}>
      <div class="mr-1 h-9 w-9 overflow-hidden rounded-lg">
        <img src={profileUrl} alt="ユーザープロフィール画像" class="object-cover w-full h-full" />
      </div>
    </a>
    <div class="flex items-center">
      <a href={`/${userId}/home`}>
        <span class="text-base text-gray-600">{userName}</span>
      </a>
    </div>
  </div>
</Card>
