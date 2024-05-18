<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { enhance } from '$app/forms';
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
  } from '$lib/components/ui/dialog';
  import DeleteIcon from '$lib/components/icons/DeleteIcon.svelte';

  export let postId;

  let dialogOpen = false;
  const handleOpen = () => {
    dialogOpen = true;
  };
  const handleClose = () => {
    dialogOpen = false;
  };
</script>

<Dialog bind:open={dialogOpen}>
  <button class="absolute right-2 top-2" on:click={handleOpen}>
    <DeleteIcon class="size-7 bg-[#25AADA]" />
  </button>
  <DialogContent class="bg-white">
    <DialogHeader>
      <DialogTitle>投稿を削除しますか？</DialogTitle>
      <DialogDescription>この処理はもとに戻せません</DialogDescription>
    </DialogHeader>
    <div class="flex justify-center">
      <form action="?/deletePost" method="POST" on:submit={handleClose} use:enhance>
        <input type="hidden" name="postId" value={postId} />
        <Button type="submit" variant="delete" class="m-2">削除する</Button>
      </form>
      <Button variant="close" class="m-2" on:click={handleClose}>Close</Button>
    </div>
  </DialogContent>
</Dialog>
