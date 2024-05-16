<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui';
  import { cn } from '$lib/utils';
  import { tabsTriggerVariants, type TabsTriggerProps } from '.';

  type $$Events = TabsPrimitive.TriggerEvents;

  let className: TabsTriggerProps['class'] = undefined;
  export let variant: TabsTriggerProps['variant'] = 'default';
  export let value: TabsTriggerProps['value'];
  export { className as class };
</script>

<TabsPrimitive.Trigger
  class={cn(tabsTriggerVariants({ variant, className }))}
  {value}
  {...$$restProps}
  on:click
>
  <slot />
</TabsPrimitive.Trigger>
