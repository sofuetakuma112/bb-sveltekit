<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { enhance } from '$app/forms';
  import DeleteIcon from '$lib/components/icons/DeleteIcon.svelte';

  export let postId;
</script>

<form method="post" use:enhance>
  <input type="hidden" name="postId" value={postId} />
  <Button type="submit" variant="likeDelete" class="absolute right-1 top-1">
    <DeleteIcon class="size-7 bg-[#25AADA]" />
  </Button>
</form>
