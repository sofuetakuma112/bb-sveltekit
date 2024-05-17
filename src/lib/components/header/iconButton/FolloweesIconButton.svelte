<script>
  import { Button } from '$lib/components/ui/button';
  export let className = undefined;
  export { className as class };
</script>

<Button variant="smOutline" sp="menubar" class={className}>
  <span class="i-ic-baseline-person size-6 sm:size-7"></span>
</Button>
