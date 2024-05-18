<script>
  import { Button } from '$lib/components/ui/button';
  import HomeIcon from '@/components/icons/HomeIcon.svelte';
  export let className = undefined;
  export { className as class };
</script>

<Button variant="smOutline" sp="menubar" class={className}>
  <HomeIcon class="size-6 sm:size-7" />
</Button>
