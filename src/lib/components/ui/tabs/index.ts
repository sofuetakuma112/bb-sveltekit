import { Tabs as TabsPrimitive } from 'bits-ui';
import Content from './tabs-content.svelte';
import List from './tabs-list.svelte';
import Trigger from './tabs-trigger.svelte';
import { tv, type VariantProps } from 'tailwind-variants';

const Root = TabsPrimitive.Root;

const tabsListVariants = tv({
  variants: {
    variant: {
      default:
        'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
      text: ''
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

type TabListVariant = VariantProps<typeof tabsListVariants>['variant'];

type TabsListProps = TabsPrimitive.ListProps & {
  variant?: TabListVariant;
};

const tabsTriggerVariants = tv({
  variants: {
    variant: {
      default:
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
      text: 'text-[16px] sm:text-[32px] font-bold text-gray-300 hover:text-black-black/50 data-[state=active]:text-black-black',
      profileText:
        'text-[16px] font-medium text-gray-300 hover:text-black-black/50 data-[state=active]:text-black-black'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

type TabsTriggerVariant = VariantProps<typeof tabsTriggerVariants>['variant'];

type TabsTriggerProps = TabsPrimitive.TriggerProps & {
  variant?: TabsTriggerVariant;
};

const tabsContentVariants = tv({
  variants: {
    variant: {
      default:
        'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      text: ''
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

type TabsContentVariant = VariantProps<typeof tabsContentVariants>['variant'];

type TabsContentProps = TabsPrimitive.ContentProps & {
  variant?: TabsContentVariant;
};

export {
  Root,
  Content,
  List,
  Trigger,
  //
  Root as Tabs,
  Content as TabsContent,
  type TabsContentProps,
  List as TabsList,
  type TabsListProps,
  Trigger as TabsTrigger,
  type TabsTriggerProps,
  tabsListVariants,
  tabsTriggerVariants,
  tabsContentVariants
};
