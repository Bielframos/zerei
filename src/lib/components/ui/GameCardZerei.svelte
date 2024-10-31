<script lang="ts">
  import { Button } from '$lib/components/ui'
  import { GameController } from '$lib/controllers/game.controller'
  import { IGDBController } from '$lib/controllers/igdb.controller'
  import { IGDBSummaryGame } from '$lib/models/summaryGame.model'
  import { Plus } from 'lucide-svelte'
  import { addToast } from './Toast.svelte'

  const { game }: { game: SummaryGameFromIGDB } = $props()
  const { id, name, coverImageUrl } = new IGDBSummaryGame(game)

  async function addToZerei(id: string) {
    const iWantToAdd = confirm(
      'Deseja adicionar o jogo a base de dados do Zerei?'
    )

    if (iWantToAdd) {
      try {
        const checkIfExist = await GameController.getUniqueGame(
          'externalReference',
          id
        )

        if (checkIfExist) {
          return addToast({
            data: {
              variant: 'notification',
              title: 'Jogo já registrado',
              description: 'Este jogo já existe na base do Zerei',
            },
          })
        }

        const completeGameData = await IGDBController.getUniqueGame(id)
        await GameController.createGame(completeGameData)
      } catch (error) {
        console.error(error)
        throw error
      }
    }
  }
</script>

<article class="relative flex flex-col items-center">
  <img src={coverImageUrl} alt={`Capa do jogo: ${name}`} class="rounded-md" />

  <Button
    ariaLabel="Adicionar jogo no Zerei"
    size="icon"
    className="absolute top-2 right-2"
    onclick={() => addToZerei(id)}><Plus /></Button
  >
</article>
