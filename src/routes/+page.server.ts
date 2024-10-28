import { createAdminClient } from "$lib/appwrite/server"
import { GAMES_TABLE_ID, ZEREI_DATABASE_ID } from "$lib/appwrite/variables"
import { Query } from "appwrite"

export async function load({ depends }) {
	depends("data:games")

	const { databases } = createAdminClient()

	const games = await databases.listDocuments<SummaryGame>(
		ZEREI_DATABASE_ID,
		GAMES_TABLE_ID,
		[Query.select(["$id", "name", "coverImage", "releaseDate"])],
	)

	return { games }
}
