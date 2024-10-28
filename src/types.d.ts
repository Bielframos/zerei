import type { Models } from "node-appwrite"

declare global {
	declare interface Game extends Models.Document {
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

	declare interface SummaryGame extends Models.Document {
		$id: string
		name: string
		coverImage: string
		releaseDate: Date
	}

	declare interface Genre extends Models.Document {
		externalReference: string
		name: string
		slug: string
		games?: Models.DocumentList<Game>
	}

	declare interface Company extends Models.Document {
		name: string
		slug: string
		developed?: Models.DocumentList<Game>
		published?: Models.DocumentList<Game>
	}

	declare interface Platform extends Models.Document {
		name: string
		abbreviation: string
		slug: string
		games?: Models.DocumentList<Game>
	}

	declare type GameFromAppwrite = {
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

	declare type CustomGameFromAppwrite = Pick<
		GameFromAppwrite,
		"id" | "name" | "cover" | "first_release_date"
	>
}
