<script lang="ts" module>
  let showSheet = $state(false)

  export function zereiTeamSheetTrigger() {
    showSheet = !showSheet
    showSheet
      ? document.body.classList.add('overflow-hidden')
      : document.body.classList.remove('overflow-hidden')
  }
</script>

<script lang="ts">
  import { Button, Input, Overlay } from '$lib/components/ui'
  import { IGDBController } from '$lib/controllers/igdb.controller'
  import { X } from 'lucide-svelte'
  import { onMount } from 'svelte'
  import { slide } from 'svelte/transition'
  import GameCardZerei from '../ui/GameCardZerei.svelte'
  import Loading from './Loading.svelte'

  let query = $state('')
  let loading = $state(false)
  let searchedGames = $state<SummaryGameFromIGDB[]>([])
  let mostPopularGames = $state<SummaryGameFromIGDB[]>([])

  async function handleSearch() {
    loading = true

    const searchInput = document.getElementById(
      'search-input'
    ) as HTMLInputElement

    query = searchInput.value
    const games = await IGDBController.findGames(query)
    searchedGames = [...games]

    loading = false
  }

  function handleClearSearch() {
    query = ''
    searchedGames = []
  }

  onMount(async () => {
    mostPopularGames = await IGDBController.getMostPopular()
  })
</script>

{#if showSheet}
  <Overlay onclick={() => zereiTeamSheetTrigger()} />
  <div
    aria-label="sheet"
    class="flex flex-col absolute z-50 h-[calc(100dvh-92px)] w-full bottom-0 bg-gradient-to-b from-slate-dark-3 to-slate-dark-4/90 backdrop-blur-lg rounded-t-2xl shadow-lg shadow-slate-dark-1 overflow-hidden"
    in:slide={{ axis: 'y' }}
    out:slide={{ axis: 'y' }}
  >
    <header class="flex p-6 gap-1">
      {#if query}
        <Button
          ariaLabel="Limpar busca"
          variant="secondary"
          size="icon"
          onclick={() => handleClearSearch()}><X /></Button
        >
      {/if}
      <Input id="search-input" type="text" placeholder="Busque por um jogo" />
      <Button ariaLabel="Buscar" onclick={() => handleSearch()}>Buscar</Button>
    </header>

    {#if query}
      <h2 class="px-6 text-lg font-normal mb-4">Resultados para "{query}"</h2>
      <div class="flex-1 grid grid-cols-2 gap-6 px-6 overflow-y-auto pb-10">
        {#if loading}
          <Loading />
        {:else}
          {#each searchedGames as game}
            <GameCardZerei {game} />
          {:else}
            <p class="col-span-2 text-slate-dark-11">Nenhum jogo encontrado</p>
          {/each}
        {/if}
      </div>
    {:else}
      <div class="flex-1 grid grid-cols-2 gap-2 px-6 overflow-y-auto pb-10">
        {#each mostPopularGames as game}
          <GameCardZerei {game} />
        {/each}
      </div>
    {/if}
  </div>
{/if}
