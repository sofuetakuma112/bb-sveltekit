<script>
  import { Button } from '$lib/components/ui/button';
  // import Icon from '$lib/components/ui/Icon.svelte';
  export let className = '';
</script>

<Button variant="smOutline" sp="menubar" class={className}>
  <!-- <Icon name="like" class="size-7 sm:size-8" /> -->
  <iconify-icon icon="mdi:heart"></iconify-icon>
</Button>
