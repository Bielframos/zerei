<script lang="ts">
  import '@fontsource-variable/readex-pro'
  import '../app.css'
  import { Toast } from '$lib/components/ui'
  import Menu from '$lib/components/modules/Menu.svelte'

  const { data, ...props } = $props()
  let account = $derived(data.account)
</script>

<header class="pt-10 pb-4 px-6 flex justify-between">
  <h1 class="text-3xl font-normal">Zerei</h1>
  <Menu {account} />
</header>

<Toast />

{@render props.children?.()}
