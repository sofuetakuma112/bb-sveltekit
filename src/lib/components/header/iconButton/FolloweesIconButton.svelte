<script>
  import { Button } from '$lib/components/ui/button';
  import PersonIcon from '$lib/components/icons/PersonIcon.svelte';
  export let className = undefined;
  export { className as class };
</script>

<Button variant="smOutline" sp="menubar" class={className}>
  <PersonIcon class="size-6 sm:size-7 bg-[#25AADA]" />
</Button>
