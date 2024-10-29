import { createAdminClient } from "$lib/utils/appwrite/server"
import { Query } from "appwrite"

export async function load({ depends }) {
	depends("data:games")

	const { databases } = createAdminClient()

	const games = await databases.listDocuments<SummaryGameAW>(
		"ZEREI-DB",
		"GAMES",
		[Query.select(["$id", "name", "coverImage", "releaseDate"])],
	)

	return { games }
}
