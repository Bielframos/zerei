import type { Models } from "node-appwrite"

declare global {
	declare interface GameAW extends Models.Document {
		name: string
		description: string
		releaseDate: Date
		coverImage: string
		avarageRating: number
		ratingCount: number
		genres: Models.DocumentList<Genre>
		developer: Company
		publisher: Company
	}

	declare interface SummaryGameAW extends Models.Document {
		name: string
		coverImage: string
		releaseDate: Date
	}

	declare interface GenreAW extends Models.Document {
		externalReference: string
		name: string
		slug: string
		games?: Models.DocumentList<Game>
	}

	declare interface CompanyAW extends Models.Document {
		name: string
		slug: string
		developed?: Models.DocumentList<Game>
		published?: Models.DocumentList<Game>
	}

	declare interface PlatformAW extends Models.Document {
		name: string
		abbreviation: string
		slug: string
		games?: Models.DocumentList<Game>
	}

	declare type GameFromGamesApi = {
		id: number
		name: string
		summary: string
		cover?: { id: number; image_id: string }
		genres: { id: number; appwriteGenreId: string }[]
		platforms: { id: number; name: string; slug: string }[]
		involved_companies: {
			id: number
			company: { id: number; name: string; slug: string }
			developer: boolean
			publisher: boolean
		}[]
		first_release_date: EpochTimeStamp
	}

	declare type CustomGameFromGamesApi = Pick<
		GameFromAppwrite,
		"id" | "name" | "cover" | "first_release_date"
	>
}
