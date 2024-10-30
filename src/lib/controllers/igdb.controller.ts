import { IGDBServices } from '$lib/services/igdb.service'

export const IGDBController = {
  findGames: async (query: string) => {
    try {
      const games = await IGDBServices.find(query)
      return games
    } catch (error) {
      console.error('Error finding game:', error)
      throw error
    }
  },
  getUniqueGame: async (id: string | number) => {
    try {
      const game = await IGDBServices.getUnique(String(id))
      return game
    } catch (error) {
      console.error('Error geting unique game:', error)
      throw error
    }
  },
  getMostPopular: async () => {
    try {
      const games = await IGDBServices.getMostPopular()
      return games
    } catch (error) {
      console.error('Error geting most popular games:', error)
      throw error
    }
  }
}
