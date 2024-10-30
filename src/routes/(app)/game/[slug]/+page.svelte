<script lang="ts">
  import Header from '$lib/components/modules/Header.svelte'
  import { Button } from '$lib/components/ui'
  import { recordController } from '$lib/controllers/record.controller'
  import { GameModel } from '$lib/models/game.model.js'
  import { Gamepad2, Library } from 'lucide-svelte'

  const { data } = $props()
  const account = $derived(data.account)
  const game = new GameModel(data.game)
</script>

<Header {account} back />

<article class="flex flex-col items-center px-6 pt-6 pb-[176px]">
  <img
    src={game.coverImage}
    alt={`Capa do jogo: ${game.name}`}
    class="rounded-md border border-indigo-dark-6 drop-shadow-lg max-w-[240px]"
  />
  <h1 class="text-2xl font-normal text-center mt-6">{game.name}</h1>
  <span class="mt-2 text-slate-dark-11">{game.launchYear}</span>

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

{#if account}
  <div
    class="fixed bottom-0 w-full py-6 flex gap-4 justify-center bg-gradient-to-b from-transparent to-indigo-dark- backdrop-blur-lg border-t border-indigo-dark-6"
  >
    <div class="grid auto-rows-min gap-2 text-center">
      <Button
        ariaLabel="Botão de registro de jogo zerado"
        size="fab"
        className="bg-transparent border-2 border-indigo-dark-9"
        onclick={() =>
          recordController.registerRecord(game.id, account.$id, 'zerado')}
        ><Gamepad2 /></Button
      >
      <span class="text-xs">Zerei</span>
    </div>

    <div class="grid auto-rows-min gap-2 text-center">
      <Button
        ariaLabel="Botão de registro de jogo zerado"
        size="fab"
        className="bg-transparent border-2 border-grass-dark-9"
        onclick={() =>
          recordController.registerRecord(game.id, account.$id, 'zerado')}
        ><Library /></Button
      >
      <span class="text-xs">Backlog</span>
    </div>
  </div>
{/if}
