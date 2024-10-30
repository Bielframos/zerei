import { createAdminClient } from '$lib/utils/appwrite/server'
import { Query } from 'node-appwrite'

export async function load({ params }) {
  const { slug } = params
  const { databases } = createAdminClient()

  const games = await databases.listDocuments<GameZerei>('ZEREI-DB', 'GAMES', [
    Query.equal('slug', slug),
  ])

  const game = games.documents[0]

  return { game }
}
