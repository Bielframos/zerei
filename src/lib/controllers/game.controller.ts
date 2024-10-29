import { gamesService } from "$lib/services/game.service"

export const GameController = {
	createGame: async (game: GameFromGamesApi) => {
		try {
			const createdGame = await gamesService.create(game)
			return createdGame
		} catch (error) {
			console.error("Error creating game:", error)
			throw error
		}
	},
	deleteGame: async (id: string) => {
		try {
			await gamesService.delete(id)
		} catch (error) {
			console.error("Error deleting game:", error)
			throw error
		}
	},
}
