<script lang="ts">
  import { Button } from '$lib/components/ui'
  import { GameController } from '$lib/controllers/game.controller'
  import { IGDBController } from '$lib/controllers/igdb.controller'
  import type {
    IGDBSummaryGame,
    ZereiSummaryGame,
  } from '$lib/models/summaryGame.model'
  import { Plus } from 'lucide-svelte'
  import { addToast } from './Toast.svelte'

  const {
    game,
    zerei,
    onclick,
  }: {
    game: IGDBSummaryGame | ZereiSummaryGame
    zerei?: boolean
    onclick?: () => void
  } = $props()

  async function addToZerei(game: IGDBSummaryGame | ZereiSummaryGame) {
    const iWantToAdd = confirm(
      'Deseja adicionar o jogo a base de dados do Zerei?'
    )

    if (iWantToAdd) {
      try {
        const checkIfExist = await GameController.getUniqueGame(
          'externalReference',
          game.id
        )

        if (checkIfExist) {
          return addToast({
            data: {
              variant: 'notification',
              title: 'Jogo já registrado',
              description: 'Este jogo já existe na base do Zerei.',
            },
          })
        }

        const completeGameData = await IGDBController.getUniqueGame(game.id)
        await GameController.createGame(completeGameData)

        addToast({
          data: {
            variant: 'success',
            title: 'Jogo adicionado',
            description: 'O jogo foi registrado com sucesso.',
          },
        })
      } catch (error) {
        console.error(error)
        throw error
      }
    }
  }
</script>

{#if zerei}
  <article class="relative flex flex-col items-center">
    <img
      src={game.coverImageUrl}
      alt={`Capa do jogo: ${game.name}`}
      class="rounded-md"
    />

    <Button
      ariaLabel="Adicionar jogo no Zerei"
      size="icon"
      className="absolute top-2 right-2"
      onclick={() => addToZerei(game)}><Plus /></Button
    >
  </article>
{:else}
  <a
    href={`/game/${game.slug}`}
    class="relative flex flex-col items-center"
    {onclick}
  >
    <img
      src={game.coverImageUrl}
      alt={`Capa do jogo: ${game.name}`}
      class="rounded-md"
    />
  </a>
{/if}
