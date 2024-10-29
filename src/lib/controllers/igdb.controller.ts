import { IGDBServices } from "$lib/services/igdb.service"

export const IGDBController = {
	findGames: async (query: string) => {
		try {
			const games = await IGDBServices.find(query)
			return games
		} catch (err) {
			console.error("Error finding game:", err)
			throw err
		}
	},
	getUniqueGame: async (id: number) => {
		try {
			const game = await IGDBServices.getUnique(id)
			return game
		} catch (err) {
			console.error("Error geting unique game:", err)
			throw err
		}
	},
}
