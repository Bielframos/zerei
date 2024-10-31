<script lang="ts">
  import { onNavigate } from '$app/navigation'
  import ZereiTeamSheet from '$lib/components/modules/ZereiTeamSheet.svelte'
  import { Toast } from '$lib/components/ui'
  import '@fontsource-variable/readex-pro'
  import '../app.css'

  let { data, ...props } = $props()
  let account = $derived(data.account)

  onNavigate(() => {
    document.body.classList.remove('overflow-hidden')
  })
</script>

<Toast />

{#if account && account.labels.includes('zerei')}
  <ZereiTeamSheet />
{/if}

{@render props.children?.()}
