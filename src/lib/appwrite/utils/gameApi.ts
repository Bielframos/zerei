import { ExecutionMethod } from "appwrite"
import { appwrite } from "../client"
import { GAMES_API_FUNCTION } from "../variables"

export async function findGame(query: string) {
	const result = await appwrite.functions.createExecution(
		GAMES_API_FUNCTION,
		JSON.stringify({ query }),
		false,
		"/game/find",
		ExecutionMethod.POST,
	)

	return JSON.parse(result.responseBody) as CustomGameFromAppwrite[]
}

export async function getUniqueGame(id: number) {
	const result = await appwrite.functions.createExecution(
		GAMES_API_FUNCTION,
		JSON.stringify({ query: id }),
		false,
		"/game/get-unique",
		ExecutionMethod.POST,
	)

	return JSON.parse(result.responseBody) as GameFromAppwrite
}
