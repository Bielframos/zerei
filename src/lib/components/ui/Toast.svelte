<script lang="ts" context="module">
  export type ToastData = {
    title: string
    description: string
    variant: 'success' | 'danger' | 'notification'
  }

  const {
    elements: { content, title, description, close },
    helpers,
    states: { toasts },
    actions: { portal },
  } = createToaster<ToastData>()

  export const addToast = helpers.addToast
</script>

<script lang="ts">
  import cn from '$lib/utils/cn'

  import { createToaster, melt } from '@melt-ui/svelte'
  import { X } from 'lucide-svelte'
  import { flip } from 'svelte/animate'
  import { fly } from 'svelte/transition'
</script>

<div
  use:portal
  class="fixed bottom-6 left-0 w-full px-6 flex flex-col gap-2 -space-y-12 z-[999]"
>
  {#each $toasts as { id, data }, idx (id)}
    {@const scale = 1 - 0.03 * ($toasts.length - (idx + 1))}
    <div
      use:melt={$content(id)}
      class="relative"
      in:fly={{ opacity: 0, y: 16, delay: idx * 150 }}
      out:fly={{ opacity: 0, y: 16 }}
      animate:flip
    >
      <div
        class={cn(
          'relative rounded-md py-2 px-4 grid auto-rows-min min-w-60 max-w-sm bg-gradient-to-r to-slate-dark-4/80 backdrop-blur-lg transition-all drop-shadow-xl',
          data.variant === 'success' && 'from-grass-dark-4',
          data.variant === 'danger' && 'from-ruby-dark-4',
          data.variant === 'notification' && 'from-indigo-dark-4'
        )}
        style={`scale: ${scale};`}
      >
        <h3 use:melt={$title(id)} class="font-normal text-lg leading-tight">
          {data.title}
        </h3>
        <p use:melt={$description(id)} class="text-slate-dark-11 text-sm">
          {data.description}
        </p>

        <button
          use:melt={$close(id)}
          aria-label="close notification"
          class="absolute top-4 right-4"
        >
          <X size={16} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  {/each}
</div>
