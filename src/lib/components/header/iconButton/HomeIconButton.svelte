<script>
  import { Button } from '$lib/components/ui/button';
  //   import Icon from '$lib/components/ui/Icon.svelte';
  export let className = '';
</script>

<Button variant="smOutline" sp="menubar" class={className}>
  <!-- <Icon name="home" class="size-6 sm:size-7" /> -->
  <iconify-icon icon="ion:home"></iconify-icon>
</Button>
