<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils';
  import { cardVariants, type Props } from '.';

  let className: Props['class'] = undefined;
  export let variant: Props['variant'] = 'single';
  export let color: Props['color'] = 'transparent';
  export { className as class };
</script>

<div class={cn(cardVariants({ variant, color, className }))} {...$$restProps}>
  <slot />
</div>
