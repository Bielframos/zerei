<script lang="ts">
  import { fade } from 'svelte/transition'

  const { onclick }: { onclick?: () => void } = $props()
</script>

<div
  role="button"
  tabindex="0"
  aria-label="Fechar modal"
  class="absolute z-40 inset-0 bg-slate-dark-1/50"
  in:fade={{ duration: 100 }}
  out:fade={{ duration: 100 }}
  {onclick}
  onkeyup={event => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      onclick
    }
  }}
></div>
