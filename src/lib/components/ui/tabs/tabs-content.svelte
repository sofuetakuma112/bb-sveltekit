<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui';
  import { cn } from '$lib/utils';
  import { tabsContentVariants, type TabsContentProps } from '.';

  let className: TabsContentProps['class'] = undefined;
  export let variant: TabsContentProps['variant'] = 'default';
  export let value: TabsContentProps['value'];
  export { className as class };
</script>

<TabsPrimitive.Content
  class={cn(tabsContentVariants({ variant, className }))}
  {value}
  {...$$restProps}
>
  <slot />
</TabsPrimitive.Content>
