<script>
  import { createEventDispatcher } from 'svelte';
  import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
    // DialogClose
  } from '$lib/components/ui/dialog';
  import { Button } from '$lib/components/ui/button';

  export let postId;

  const dispatch = createEventDispatcher();

  const deletePost = () => {
    dispatch('delete', { postId });
  };
</script>

<Dialog>
  <DialogTrigger class="absolute right-2 top-2" asChild>
    <button><span class="i-ic-baseline-delete size-7"></span></button>
  </DialogTrigger>
  <DialogContent class="bg-white">
    <DialogHeader>
      <DialogTitle>投稿を削除しますか？</DialogTitle>
      <DialogDescription>この処理はもとに戻せません</DialogDescription>
    </DialogHeader>
    <div class="flex justify-center">
      <Button type="button" on:click={deletePost} variant="delete" class="m-2">削除する</Button>
      <!-- <DialogClose asChild> -->
      <Button variant="close" class="m-2">Close</Button>
      <!-- </DialogClose> -->
    </div>
  </DialogContent>
</Dialog>
