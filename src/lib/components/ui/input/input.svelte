<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils';
  import type { InputEvents, InputProps } from '.';
  import { inputVariants } from '.';

  type $$Events = InputEvents;

  let className: InputProps['class'] = undefined;
  export let variant: InputProps['variant'] = 'single';
  export let borderColor: InputProps['borderColor'] = 'normal';
  export let value: InputProps['value'] = undefined;
  export { className as class };
</script>

<input
  class={cn(inputVariants({ variant, borderColor }), className)}
  bind:value
  on:blur
  on:change
  on:click
  on:focus
  on:keydown
  on:keypress
  on:keyup
  on:mouseover
  on:mouseenter
  on:mouseleave
  on:paste
  on:input
  {...$$restProps}
/>
