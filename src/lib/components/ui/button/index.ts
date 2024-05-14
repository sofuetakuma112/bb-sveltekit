import Root from './button.svelte';
import { tv, type VariantProps } from 'tailwind-variants';
import type { Button as ButtonPrimitive } from 'bits-ui';

const buttonVariants = tv({
	base: 'ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	variants: {
		variant: {
			default: '',
			smOutline:
				'border-input hover:bg-accent hover:text-accent-foreground rounded-full border-2 size-10 sm:size-16',
			lgOutline:
				'border-input hover:bg-accent hover:text-accent-foreground rounded-full border-2 size-16 sm:size-24',
			ghost:
				'hover:text-white-white/80 rounded-full bg-blue-300 transition-all duration-500 ease-out hover:opacity-70 size-10 sm:size-16',
			follow:
				'h-8 w-[108px] rounded-xl border bg-blue-500 hover:bg-blue-600 text-white-white rounded-md px-4 py-2',
			following:
				'h-8 w-[108px] rounded-xl border bg-gray-200 hover:bg-gray-200/50 text-white-white rounded-md px-4 py-2',
			delete:
				'text-white-white hover:text-accent-foreground rounded-full bg-red-300 hover:bg-red-300/50 h-10 w-28',
			close: 'rounded-full border border-gray-300 hover:bg-gray-300 h-10 w-28',
			upload: 'text-white-white rounded-3xl bg-blue-300 hover:bg-blue-300/50 h-10 w-28',
			likeDelete: 'rounded-full size-10 sm:size-16'
		},
		font: {
			normal: 'font-normal',
			bold: 'font-bold'
		},
		sp: {
			none: '',
			menubar:
				'border-input hover:text-accent-foreground flex flex-1 sm:flex-none items-center justify-center border-0 w-full rounded-none'
		}
	},
	defaultVariants: {
		variant: 'default',
		font: 'normal',
		sp: 'none'
	}
});

type Variant = VariantProps<typeof buttonVariants>['variant'];
type Font = VariantProps<typeof buttonVariants>['font'];
type Sp = VariantProps<typeof buttonVariants>['sp'];

type Props = ButtonPrimitive.Props & {
	variant?: Variant;
	font?: Font;
	sp?: Sp;
};

type Events = ButtonPrimitive.Events;

export {
	Root,
	type Props,
	type Events,
	//
	Root as Button,
	type Props as ButtonProps,
	type Events as ButtonEvents,
	buttonVariants
};
