import { ID } from 'appwrite'
import { appwrite } from '$lib/utils/appwrite/client'
import { imageUrlBuilder } from '$lib/utils/igdb'
import { Query } from 'node-appwrite'

export const gamesService = {
  create: async (game: GameFromIGDB) => {
    const { databases } = appwrite
    const developer = game.involved_companies.find(company => company.developer)
    const publisher = game.involved_companies.find(company => company.publisher)

    const coverImage = game.cover
      ? imageUrlBuilder(game.cover.image_id, 'cover_big')
      : null

    return databases.createDocument<GameZerei>(
      'ZEREI-DB',
      'GAMES',
      ID.unique(),
      {
        name: game.name,
        slug: game.slug,
        description: game.summary,
        coverImage,
        releaseDate: new Date(game.first_release_date * 1000).toISOString(),
        averageRating: 0,
        ratingCount: 0,
        genres: game.genres
          ? game.genres.map(genre => genre.appwriteGenreId)
          : null,
        platforms: game.platforms.map(platform => ({
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
        externalReference: String(game.id),
      }
    )
  },
  delete: async (id: string) => {
    return appwrite.databases.deleteDocument('ZEREI-DB', 'GAMES', id)
  },
  getUnique: async (by: 'id' | 'externalReference', query: string) => {
    return appwrite.databases.listDocuments('ZEREI-DB', 'GAMES', [
      Query.equal(by === 'id' ? '$id' : 'externalReference', [query]),
    ])
  },
  getRecentlyAdded: async () => {
    return appwrite.databases.listDocuments<GameZerei>('ZEREI-DB', 'GAMES', [
      Query.orderDesc('$createdAt'),
      Query.limit(12),
    ])
  },
  findGames: async (query: string) => {
    return appwrite.databases.listDocuments<GameZerei>('ZEREI-DB', 'GAMES', [
      Query.search('name', query),
    ])
  },
}
