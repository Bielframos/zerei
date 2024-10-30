import type { Models } from 'node-appwrite'

declare global {
  declare type Account = Models.User<Models.Preferences> | null

  declare interface GameZerei extends Models.Document {
    name: string
    description: string
    releaseDate: string
    coverImage: string
    avarageRating: number
    ratingCount: number
    genres: genre[]
    developer: Company
    publisher: Company
    platforms: Platform[]
    records: Omit<Record, 'game'>[]
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

  declare interface RecordZerei extends Models.Document {
    type: 'zerado' | 'backlog'
    game: GameZerei
  }

  declare interface Dashboard extends Models.Document {
    userId: string
    completedGamesCount: number
    backlogGamesCount: number
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
    'id' | 'name' | 'slug' | 'cover' | 'first_release_date'
  >
}
