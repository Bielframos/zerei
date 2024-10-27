import { ID } from "appwrite"
import { appwrite } from "../client"
import { GAMES_TABLE_ID, ZEREI_DATABASE_ID } from "../variables"
import { imageUrlBuilder } from "$lib/igdb"
import { invalidate } from "$app/navigation"

export async function createGame(game: GameFromAppwrite) {
	const { databases } = appwrite
	const developer = game.involved_companies.find((company) => company.developer)
	const publisher = game.involved_companies.find((company) => company.publisher)
	const coverImage = game.cover
		? imageUrlBuilder(game.cover.image_id, "cover_big")
		: null

	try {
		await databases.createDocument<Game>(
			ZEREI_DATABASE_ID,
			GAMES_TABLE_ID,
			ID.unique(),
			{
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
			},
		)

		invalidate("data:games")
	} catch (err) {
		console.log(err)
	}
}
