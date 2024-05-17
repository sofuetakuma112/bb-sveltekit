import type { HTMLAttributes } from 'svelte/elements';
import Root from './card.svelte';
import { tv, type VariantProps } from 'tailwind-variants';

const cardVariants = tv({
  base: 'size-full',
  variants: {
    variant: {
      single: 'max-w-[1172px] rounded-3xl',
      list: 'max-w-[270px] rounded-xl'
    },
    color: {
      transparent: 'bg-transparent',
      white: 'border bg-white-white shadow-[0_6px_5px_0px_rgba(0,0,0,0.2)]',
      blue: 'bg-gradient-to-b from-blue-white-100 via-blue-white-300 to-blue-300',
      superlike: 'bg-gradient-to-b from-blue-400 via-purple-100 to-pink-500'
    }
  },
  defaultVariants: {
    variant: 'single',
    color: 'transparent'
  }
});

type Variant = VariantProps<typeof cardVariants>['variant'];
type Color = VariantProps<typeof cardVariants>['color'];

type Props = HTMLAttributes<HTMLDivElement> & {
  variant?: Variant;
  color?: Color;
};

export { Root, Root as Card, cardVariants };
export type { Props };

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
