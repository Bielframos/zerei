import { createAdminClient } from '$lib/utils/appwrite/server'
import { Query } from 'appwrite'
import { ExecutionMethod } from 'node-appwrite'

export async function load({ depends }) {
  depends('data:games')

  const { databases, functions } = createAdminClient()

  const games = await databases.listDocuments<SummaryGameFromZerei>(
    'ZEREI-DB',
    'GAMES',
    [
      Query.select(['$id', 'name', 'coverImage', 'releaseDate']),
      Query.orderDesc('$createdAt'),
    ]
  )

  const result = await functions.createExecution(
    '6720f6ee0017b924e933',
    '',
    false,
    '/most-popular',
    ExecutionMethod.GET
  )

  const mostPolularGames = JSON.parse(
    result.responseBody
  ) as SummaryGameFromIGDB[]

  return { games, mostPolularGames }
}
