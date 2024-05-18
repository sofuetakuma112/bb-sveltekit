<script>
  import { Button } from '$lib/components/ui/button';
  import NotificationsIcon from '@/components/icons/NotificationsIcon.svelte';

  export let className = undefined;
  export { className as class };
</script>

<Button variant="smOutline" sp="menubar" class={className}>
  <NotificationsIcon class="size-6 sm:size-7 bg-[#25AADA]" />
</Button>
