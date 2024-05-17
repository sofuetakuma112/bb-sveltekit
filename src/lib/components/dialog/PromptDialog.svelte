<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Badge } from '$lib/components/ui/badge';
  import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
  } from '$lib/components/ui/dialog';
  import { cn } from '@/utils';

  export let imageUrl: string;
  export let hashtags: {
    id: string;
    postId: string;
    tag: string;
  }[] = [];
  export let prompt: string;
  export let isUnderReviewPost = false;

  const dispatch = createEventDispatcher();
</script>

<Dialog>
  <DialogTrigger class="block w-full h-full" asChild>
    <button class="h-full overflow-hidden rounded-2xl">
      <img src={imageUrl} alt="AI画像" class="w-full h-full object-cover" />
    </button>
  </DialogTrigger>
  <DialogContent class="bg-white">
    <DialogHeader>
      <DialogTitle>ハッシュタグ</DialogTitle>
    </DialogHeader>
    <DialogDescription>
      {#each hashtags as hashTag, i (hashTag.id)}
        <Badge class={cn('mr-1', { hidden: isUnderReviewPost })}>
          {hashTag.tag}
        </Badge>
      {/each}
    </DialogDescription>
    <DialogHeader>
      <DialogTitle>プロンプト</DialogTitle>
    </DialogHeader>
    <DialogDescription class={cn({ hidden: isUnderReviewPost })}>
      {prompt}
    </DialogDescription>
  </DialogContent>
</Dialog>
