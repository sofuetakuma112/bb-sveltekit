<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { enhance } from '$app/forms';

  export let postId;
</script>

<form method="post" use:enhance>
  <input type="hidden" name="postId" value={postId} />
  <Button type="submit" variant="likeDelete" class="absolute right-1 top-1">
    <span class="i-ic-baseline-delete size-7"></span>
  </Button>
</form>
