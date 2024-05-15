<script>
  import { Button } from '$lib/components/ui/button';
  // import Icon from '$lib/components/ui/Icon.svelte';
  export let className = '';
</script>

<Button variant="smOutline" sp="menubar" class={className}>
  <!-- <Icon name="notification" class="size-6 sm:size-[28px]" /> -->
  <iconify-icon icon="mingcute:notification-fill"></iconify-icon>
</Button>
