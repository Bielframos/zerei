import { ID } from "appwrite"
import { appwrite } from "$lib/utils/appwrite/client"
import { imageUrlBuilder } from "$lib/utils/igdb"

export const gamesService = {
	create: async (game: GameFromGamesApi) => {
		const { databases } = appwrite

		const developer = game.involved_companies.find(
			(company) => company.developer,
		)

		const publisher = game.involved_companies.find(
			(company) => company.publisher,
		)

		const coverImage = game.cover
			? imageUrlBuilder(game.cover.image_id, "cover_big")
			: null

		return databases.createDocument<GameAW>("ZEREI-DB", "GAMES", ID.unique(), {
			name: game.name,
			description: game.summary,
			coverImage,
			releaseDate: new Date(game.first_release_date * 1000).toISOString(),
			averageRating: 0,
			ratingCount: 0,
			genres: game.genres.map((genre) => genre.appwriteGenreId),
			platforms: game.platforms.map((platform) => ({
				$id: platform.id,
				name: platform.name,
				slug: platform.slug,
			})),
			developer: {
				$id: developer?.company.id,
				name: developer?.company.name,
				slug: developer?.company.slug,
			},
			publisher: {
				$id: publisher?.company.id,
				name: publisher?.company.name,
				slug: publisher?.company.slug,
			},
		})
	},
	delete: async (id: string) => {
		return appwrite.databases.deleteDocument("ZEREI-DB", "GAMES", id)
	},
}
