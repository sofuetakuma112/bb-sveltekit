<script>
  import { Button } from '$lib/components/ui/button';
  // import Icon from '$lib/components/ui/Icon.svelte';
  export let className = '';
</script>

<Button variant="smOutline" sp="menubar" class={className}>
  <!-- <Icon name="post" class="size-7 sm:size-8" /> -->
  <iconify-icon icon="ic:baseline-post-add"></iconify-icon>
</Button>
