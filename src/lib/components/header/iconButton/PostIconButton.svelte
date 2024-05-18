<script>
  import { Button } from '$lib/components/ui/button';
  import PostAddIcon from '$lib/components/icons/PostAddIcon.svelte';

  export let className = undefined;
  export { className as class };
</script>

<Button variant="smOutline" sp="menubar" class={className}>
  <PostAddIcon class="size-6 sm:size-7" />
</Button>
