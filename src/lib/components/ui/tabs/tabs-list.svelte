<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui';
  import { cn } from '$lib/utils';
  import { tabsListVariants, type TabsListProps } from '.';

  let className: TabsListProps['class'] = undefined;
  export let variant: TabsListProps['variant'] = 'default';
  export { className as class };
</script>

<TabsPrimitive.List class={cn(tabsListVariants({ variant, className }))} {...$$restProps}>
  <slot />
</TabsPrimitive.List>
