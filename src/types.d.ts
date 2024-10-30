import type { Models } from 'node-appwrite'

declare global {
  declare interface GameAW extends Models.Document {
    name: string
    description: string
    releaseDate: string
    coverImage: string
    avarageRating: number
    ratingCount: number
    genres: Models.DocumentList<Genre>
    developer: Company
    publisher: Company
  }

  declare interface SummaryGameFromZerei extends Models.Document {
    name: string
    coverImage: string
    releaseDate: string
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

  declare type GameFromIGDB = {
    id: number
    name: string
    slug: string
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

  declare type SummaryGameFromIGDB = Pick<
    GameFromIGDB,
    'id' | 'name' | 'cover' | 'first_release_date'
  >
}
