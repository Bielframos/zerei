import { appwrite } from '$lib/utils/appwrite/client'
import { ExecutionMethod } from 'appwrite'

const IGDB_FUNCTION_ID = '6720f6ee0017b924e933'

export const IGDBServices = {
  find: async (query: string) => {
    const result = await appwrite.functions.createExecution(
      IGDB_FUNCTION_ID,
      JSON.stringify({ query }),
      false,
      '/find',
      ExecutionMethod.POST
    )

    return JSON.parse(result.responseBody) as SummaryGameFromIGDB[]
  },
  getMostPopular: async () => {
    const result = await appwrite.functions.createExecution(
      IGDB_FUNCTION_ID,
      '',
      false,
      '/most-popular',
      ExecutionMethod.GET
    )

    return JSON.parse(result.responseBody) as SummaryGameFromIGDB[]
  },
  getUnique: async (id: string) => {
    const result = await appwrite.functions.createExecution(
      IGDB_FUNCTION_ID,
      JSON.stringify({ query: id }),
      false,
      '/get-unique',
      ExecutionMethod.POST
    )

    return JSON.parse(result.responseBody) as GameFromIGDB
  },
}
