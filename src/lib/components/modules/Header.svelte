<script lang="ts">
  import { ArrowLeft } from 'lucide-svelte'
  import { Button } from '../ui'
  import Menu from './Menu.svelte'

  const { account, back }: { account: Account; back?: boolean } = $props()

  function backToLastPage() {
    window.history.back()
  }
</script>

<header class="pt-10 pb-4 px-6 flex justify-between">
  <div class="flex gap-4 items-center">
    {#if back}
      <Button
        ariaLabel="Limpar busca"
        variant="secondary"
        size="icon"
        onclick={() => backToLastPage()}><ArrowLeft /></Button
      >
    {/if}
    <h1 class="text-3xl font-normal">Zerei</h1>
  </div>
  <Menu {account} />
</header>
