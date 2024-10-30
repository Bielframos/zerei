<script lang="ts">
  import { Button } from '$lib/components/ui'
  import { Plus } from 'lucide-svelte'
  import { setContext } from 'svelte'
  import Menu from './Menu.svelte'
  import ZereiTeamSheet from './ZereiTeamSheet.svelte'
  import ZereiUserSheet, {
    zereiUserSheetTrigger,
  } from './ZereiUserSheet.svelte'

  const { data } = $props()
  let account = $derived(data.account)
  let games = $derived(data.games)

  setContext('mostPopularGames', data.mostPolularGames)
</script>

<header class="pt-10 pb-4 px-6 flex justify-between">
  <h1 class="text-3xl font-normal">Zerei</h1>

  <Menu {account} />
</header>

<ZereiTeamSheet />
<ZereiUserSheet {games} />

<div
  class="absolute bottom-0 w-full pb-6 pt-8 flex justify-center bg-gradient-to-b from-transparent to-indigo-dark-1 backdrop-blur-lg"
>
  <Button
    ariaLabel="Botão de busca"
    size="fab"
    onclick={() => zereiUserSheetTrigger()}><Plus /></Button
  >
</div>
