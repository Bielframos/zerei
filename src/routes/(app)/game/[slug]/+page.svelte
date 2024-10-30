<script lang="ts">
  import { Button } from '$lib/components/ui'
  import { recordController } from '$lib/controllers/record.controller'
  import { GameModel } from '$lib/models/game.model.js'
  import { Gamepad2, Library } from 'lucide-svelte'

  const { data } = $props()
  let account = $derived(data.account)
  const game = new GameModel(data.game)
</script>

<header class="grid auto-rows-min justify-items-center px-10 pt-6 pb-10">
  <img
    src={game.coverImage}
    alt={`Capa do jogo: ${game.name}`}
    class="rounded-md border border-indigo-dark-6 drop-shadow-lg"
  />
  <h1 class="text-2xl font-normal text-center mt-6">{game.name}</h1>
  <span class="mt-2 text-slate-dark-11">{game.launchYear}</span>
</header>

<hr class="border-indigo-dark-6 mx-6" />

{#if account}
  <div
    class="absolute bottom-0 w-full pb-6 pt-8 flex gap-4 justify-center bg-gradient-to-b from-transparent to-indigo-dark-1 backdrop-blur-lg"
  >
    <Button
      ariaLabel="Botão de registro de jogo zerado"
      size="fab"
      onclick={() =>
        recordController.registerRecord(game.id, account.$id, 'zerado')}
      ><Gamepad2 /></Button
    >

    <Button
      ariaLabel="Botão de registro de jogo zerado"
      size="fab"
      className="bg-grass-dark-9 hover:bg-grass-dark-8 text-grass-dark-12"
      onclick={() =>
        recordController.registerRecord(game.id, account.$id, 'zerado')}
      ><Library /></Button
    >
  </div>
{/if}
