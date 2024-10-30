<script lang="ts">
  import Header from '$lib/components/modules/Header.svelte'
  import { GameModel } from '$lib/models/game.model.js'
  import RecordManager from './RecordManager.svelte'

  const { data } = $props()
  const account = $derived(data.account)
  const game = new GameModel(data.game)
</script>

<Header {account} back />

<article class="flex flex-col items-center px-6 pt-6 pb-10">
  <img
    src={game.coverImage}
    alt={`Capa do jogo: ${game.name}`}
    class="rounded-md border border-indigo-dark-6 drop-shadow-lg max-w-[240px]"
  />
  <h1 class="text-2xl font-normal text-center mt-6">{game.name}</h1>
  <span class="text-slate-dark-11">{game.launchYear}</span>

  <hr class="border-2 border-indigo-dark-6 w-full my-6 rounded-full" />
  <RecordManager {account} gameId={game.id} />
  <hr class="border-2 border-indigo-dark-6 w-full my-6 rounded-full" />

  <p>{game.description}</p>

  <div class="w-full">
    <h6 class="text-sm uppercase text-indigo-dark-12 mt-6">Gêneros</h6>
    <p>{game.genres}</p>
  </div>

  <div class="w-full">
    <h6 class="text-sm uppercase text-indigo-dark-12 mt-6">Plataformas</h6>
    <p>{game.platforms}</p>
  </div>

  <div class="w-full">
    <h6 class="text-sm uppercase text-indigo-dark-12 mt-6">Desenvolvedora</h6>
    <p>{game.developer}</p>
  </div>

  <div class="w-full">
    <h6 class="text-sm uppercase text-indigo-dark-12 mt-6">Publisher</h6>
    <p>{game.publisher}</p>
  </div>

  <div class="w-full">
    <h6 class="text-sm uppercase text-indigo-dark-12 mt-6">
      Data de lançamento
    </h6>
    <p>{game.localeReleaseDate}</p>
  </div>
</article>
