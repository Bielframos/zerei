import { appwrite } from "$lib/utils/appwrite/client"
import { ExecutionMethod } from "appwrite"

const IGDB_FUNCTION_ID = "6720f6ee0017b924e933"

export const IGDBServices = {
	find: async (query: string) => {
		const result = await appwrite.functions.createExecution(
			IGDB_FUNCTION_ID,
			JSON.stringify({ query }),
			false,
			"/game/find",
			ExecutionMethod.POST,
		)

		return JSON.parse(result.responseBody) as CustomGameFromGamesApi[]
	},
	getUnique: async (id: number) => {
		const result = await appwrite.functions.createExecution(
			IGDB_FUNCTION_ID,
			JSON.stringify({ query: id }),
			false,
			"/game/get-unique",
			ExecutionMethod.POST,
		)

		return JSON.parse(result.responseBody) as GameFromGamesApi
	},
}
