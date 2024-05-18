<script>
  import { Button } from '$lib/components/ui/button';
  import HeartIcon from '$lib/components/icons/HeartIcon.svelte';
  export let className = undefined;
  export { className as class };
</script>

<Button variant="smOutline" sp="menubar" class={className}>
  <HeartIcon class="size-6 sm:size-7" />
</Button>
