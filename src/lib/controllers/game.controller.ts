import { invalidate } from '$app/navigation'
import { addToast } from '$lib/components/ui/Toast.svelte'
import { gamesService } from '$lib/services/game.service'

export const GameController = {
  createGame: async (game: GameFromIGDB) => {
    try {
      addToast({
        data: {
          variant: 'notification',
          title: 'O jogo estã sendo adicionado',
          description: 'Avisaremos quando terminarmos',
        },
      })

      const createdGame = await gamesService.create(game)
      invalidate('data:zerei')

      addToast({
        data: {
          variant: 'success',
          title: 'Jogo adicionado',
          description: 'O jogo foi registrado com sucesso',
        },
      })

      return createdGame
    } catch (error) {
      addToast({
        data: {
          variant: 'danger',
          title: 'Erro ao adicionar jogo',
          description: 'Houve um erro ao adicionar o jogo',
        },
      })

      console.error('Error creating game:', error)
      throw error
    }
  },
  deleteGame: async (id: string) => {
    try {
      await gamesService.delete(id)
    } catch (error) {
      console.error('Error deleting game:', error)
      throw error
    }
  },
  getUniqueGame: async (by: 'id' | 'externalReference', query: string) => {
    try {
      const games = await gamesService.getUnique(by, query)

      if (games.total > 0) {
        return games.documents[0]
      }

      return null
    } catch (error) {
      console.error('Error searching for game:', error)
      throw error
    }
  },
  getRecentlyAdded: async () => {
    try {
      const games = await gamesService.getRecentlyAdded()
      return games
    } catch (error) {
      console.error('Error searching for game:', error)
      throw error
    }
  },
  findGames: async (query: string) => {
    try {
      const games = await gamesService.findGames(query)
      return games
    } catch (error) {
      console.error('Error searching for game:', error)
      throw error
    }
  },
}
