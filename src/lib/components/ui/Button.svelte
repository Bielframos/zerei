<script lang="ts" module>
  import cn from '$lib/utils/cn'
  import { cva, type VariantProps } from 'class-variance-authority'

  type StyleProps = VariantProps<typeof buttonStyle>
  export const buttonStyle = cva(
    'h-8 inline-flex w-fit gap-2 items-center justify-center outline-none focus-visible:ring-2 ring-indigo-dark-6 rounded-full disabled:opacity-50 disabled:bg-slate-dark-9 disabled:text-slate-dark-11 disabled:pointer-events-none transition-all',
    {
      variants: {
        variant: {
          default:
            'bg-indigo-dark-9 text-indigo-dark-12 hover:bg-indigo-dark-8',
          secondary: 'bg-slate-dark-4 text-slate-dark-12 hover:bg-slate-dark-5',
        },
        size: {
          small: 'text-sm px-4 py-2',
          medium: 'text-md px-4 py-2',
          large: 'text-lg px-4 py-2',
          icon: 'h-8 w-8 min-h-8 min-w-8',
          fab: 'h-14 w-14 min-h-14 min-w-14',
        },
        iconPos: {
          before: 'pl-3 pr-4',
          after: 'pl-4 pr-3',
        },
      },
      defaultVariants: {
        variant: 'default',
        size: 'medium',
      },
    }
  )
</script>

<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'

  interface ButtonProps extends HTMLButtonAttributes, StyleProps {
    ariaLabel: string
    className?: string
  }

  let { ariaLabel, variant, size, iconPos, className, ...props }: ButtonProps =
    $props()
</script>

<button
  aria-label={ariaLabel}
  class={cn('zerei-btn', buttonStyle({ variant, iconPos, size, className }))}
  {...props}
  >{@render props.children?.()}

  <style>
    .zerei-btn .lucide {
      width: 20px;
      height: 20px;
    }
  </style>
</button>
