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
  import { cn } from '$lib/utils';

  export let imageUrl: string;
  export let hashtags: {
    id: string;
    name: string;
  }[] = [];
  export let prompt: string;
  export let isUnderReviewPost = false;

  const dispatch = createEventDispatcher();
</script>

<Dialog>
  <DialogTrigger class="block size-full rounded-2xl">
    <img src={imageUrl} alt="AI画像" class="w-full h-full object-cover" />
  </DialogTrigger>
  <DialogContent class="bg-white">
    <DialogHeader>
      <DialogTitle>ハッシュタグ</DialogTitle>
    </DialogHeader>
    <DialogDescription>
      {#each hashtags as hashTag, i (hashTag.id)}
        <Badge class={cn('mr-1', { hidden: isUnderReviewPost })}>
          {hashTag.name}
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
