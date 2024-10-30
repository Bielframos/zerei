<script lang="ts" module>
  import cn from '$lib/utils/cn'
  import { cva, type VariantProps } from 'class-variance-authority'

  type StyleProps = VariantProps<typeof inputStyle>
  export const inputStyle = cva(
    'px-4 py-1 w-full rounded-full outline-none focus-visible-ring-2 ring-indigo-dark-6 transition-all',
    {
      variants: {
        variant: {
          default:
            'bg-slate-dark-4 hover:bg-slate-dark-5 placeholder:text-slate-dark-11 text-slate-dark-12',
          error: '',
        },
      },
      defaultVariants: { variant: 'default' },
    }
  )
</script>

<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements'

  interface InputProps extends HTMLInputAttributes, StyleProps {
    className?: string
  }

  let {
    value = $bindable(),
    variant,
    className,
    ...props
  }: InputProps = $props()
</script>

<input class={cn(inputStyle({ variant, className }))} bind:value {...props} />
