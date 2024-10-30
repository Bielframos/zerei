<script lang="ts">
  import '@fontsource-variable/readex-pro'
  import '../app.css'
  import { Toast } from '$lib/components/ui'
  import ZereiTeamSheet from '$lib/components/modules/ZereiTeamSheet.svelte'

  let { data, ...props } = $props()
  let account = $derived(data.account)
</script>

<Toast />

{#if account && account.labels.includes('zerei')}
  <ZereiTeamSheet />
{/if}

{@render props.children?.()}
