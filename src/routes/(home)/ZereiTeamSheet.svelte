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
  import { Button, GameCard, Input } from '$lib/components/ui'
  import { IGDBController } from '$lib/controllers/igdb.controller'
  import { IGDBSummaryGame } from '$lib/models/summaryGame.model'
  import { X } from 'lucide-svelte'
  import { getContext } from 'svelte'
  import { fade, slide } from 'svelte/transition'

  let scrim = $state<HTMLDivElement | undefined>()
  let query = $state('')
  let loading = $state(false)
  let searchedGames = $state<SummaryGameFromIGDB[]>([])

  const mostPolularGames = getContext(
    'mostPopularGames'
  ) as SummaryGameFromIGDB[]

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

  $effect(() => {
    if (scrim) {
      scrim.addEventListener('click', () => {
        zereiTeamSheetTrigger()
      })
    }
  })
</script>

{#if showSheet}
  <div
    aria-label="scrim"
    bind:this={scrim}
    class="absolute z-40 inset-0 bg-slate-dark-1/50"
    in:fade={{ duration: 100 }}
    out:fade={{ duration: 100 }}
  ></div>
{/if}

{#if showSheet}
  <div
    aria-label="sheet"
    class="flex flex-col absolute z-50 h-[calc(100dvh-92px)] w-full bottom-0 bg-gradient-to-b from-slate-dark-3/80 to-slate-dark-4/80 backdrop-blur-lg rounded-t-2xl shadow-lg shadow-slate-dark-1 overflow-hidden"
    in:slide={{ axis: 'y' }}
    out:slide={{ axis: 'y' }}
  >
    <header class="flex p-6 gap-1">
      {#if searchedGames.length > 0}
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

    {#if searchedGames.length > 0}
      <h2 class="px-6 text-lg font-normal mb-4">Resultados para "{query}"</h2>
      <div class="flex-1 grid grid-cols-2 gap-6 px-6 overflow-y-auto pb-10">
        {#each searchedGames as searchedGame}
          {@const game = new IGDBSummaryGame(searchedGame)}

          <GameCard {game} zerei />
        {/each}
      </div>
    {:else}
      <div class="flex-1 grid grid-cols-2 gap-6 px-6 overflow-y-auto pb-10">
        {#each mostPolularGames as popularGameFromIGDB}
          {@const popularGame = new IGDBSummaryGame(popularGameFromIGDB)}

          <GameCard game={popularGame} zerei />
        {/each}
      </div>
    {/if}
  </div>
{/if}
