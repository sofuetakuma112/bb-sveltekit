<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
  } from '$lib/components/ui/dialog';
  import { constructImageUrl } from '$lib/url';
  import { cn } from '$lib/utils';

  export let imageUrl: string;
  export let hashtags: {
    id: string;
    name: string;
  }[] = [];
  export let prompt: string;
  export let isUnderReviewPost = false;

  let styles = {
    'background-image': `url("${imageUrl}")`
  };

  $: cssVarStyles = Object.entries(styles)
    .map(([key, value]) => `${key}:${value}`)
    .join(';');
</script>

<Dialog>
  <DialogTrigger class="block size-full rounded-2xl">
    <div class="size-full bg-no-repeat bg-cover bg-center backdrop-blur-md" style={cssVarStyles}>
      <img
        src={constructImageUrl(imageUrl, {
          width: 356
        })}
        alt="AI画像"
        class="size-full object-cover hover:object-contain backdrop-blur-md"
      />
    </div>
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
