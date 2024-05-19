<script>
  import { Button } from '$lib/components/ui/button';
  import PeopleIcon from '$lib/components/icons/PeopleIcon.svelte';

  export let className = undefined;
  export { className as class };
</script>

<Button variant="smOutline" sp="menubar" class={className}>
  <PeopleIcon class="size-6 sm:size-7 bg-[#25AADA]" />
</Button>
