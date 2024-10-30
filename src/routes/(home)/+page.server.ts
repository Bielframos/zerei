import { createAdminClient } from '$lib/utils/appwrite/server'
import { ExecutionMethod } from 'node-appwrite'

export async function load({ depends }) {
  depends('data:games')

  const { functions } = createAdminClient()

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

  return { mostPolularGames }
}
