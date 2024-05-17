import type { HTMLInputAttributes } from 'svelte/elements';
import Root from './input.svelte';
import { tv, type VariantProps } from 'tailwind-variants';

const inputVariants = tv({
  base: 'bg-background ring-offset-background placeholder:text-muted-foreground mt-3 flex h-10 w-full mx-auto border px-3 py-2 text-sm focus-visible:outline-blue-300 disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    variant: {
      single: 'rounded-md ',
      multi: 'min-h-[112px] rounded-xl',
      round: 'rounded-3xl',
      file: 'align-center min-h-[112px] rounded-md text-center text-blue-300 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-blue-300'
    },
    borderColor: {
      normal: 'border-slate-300',
      whiteBlue: 'border-blue-300',
      blue: 'border-blue-300'
    }
  },
  defaultVariants: {
    variant: 'single',
    borderColor: 'normal'
  }
});

type Variant = VariantProps<typeof inputVariants>['variant'];
type BorderColor = VariantProps<typeof inputVariants>['borderColor'];

type Props = HTMLInputAttributes & {
  variant?: Variant;
  borderColor?: BorderColor;
};

type FormInputEvent<T extends Event = Event> = T & {
  currentTarget: EventTarget & HTMLInputElement;
};
export type InputEvents = {
  blur: FormInputEvent<FocusEvent>;
  change: FormInputEvent<Event>;
  click: FormInputEvent<MouseEvent>;
  focus: FormInputEvent<FocusEvent>;
  keydown: FormInputEvent<KeyboardEvent>;
  keypress: FormInputEvent<KeyboardEvent>;
  keyup: FormInputEvent<KeyboardEvent>;
  mouseover: FormInputEvent<MouseEvent>;
  mouseenter: FormInputEvent<MouseEvent>;
  mouseleave: FormInputEvent<MouseEvent>;
  paste: FormInputEvent<ClipboardEvent>;
  input: FormInputEvent<InputEvent>;
};

export { Root, Root as Input, inputVariants };
export type { Props as InputProps };
