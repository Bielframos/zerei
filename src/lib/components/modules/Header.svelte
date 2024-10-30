<script lang="ts">
  import { ArrowLeft } from 'lucide-svelte'
  import { Button } from '../ui'
  import Menu from './Menu.svelte'
  import cn from '$lib/utils/cn'
  import { buttonStyle } from '../ui/Button.svelte'

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

  {#if account}
    <Menu {account} />
  {:else}
    <div class="flex gap-2 items-center">
      <a
        href="/auth/login"
        class={cn(buttonStyle({ size: 'small', variant: 'secondary' }))}
        >Acessar
      </a>

      <a href="/auth/registrar" class={cn(buttonStyle({ size: 'small' }))}
        >Criar conta
      </a>
    </div>
  {/if}
</header>
