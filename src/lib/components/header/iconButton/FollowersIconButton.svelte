<script>
  import { Button } from '$lib/components/ui/button';
  // import Icon from '$lib/components/ui/Icon.svelte';
  export let className = '';
</script>

<Button variant="smOutline" sp="menubar" class={className}>
  <span class="i-ic-baseline-people size-6 sm:size-7"></span>
</Button>
