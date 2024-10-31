import { appwrite } from '$lib/utils/appwrite/client'
import { ID, Permission, Query, Role } from 'appwrite'

export const recordService = {
  get: async (userId: string, type: 'zerado' | 'backlog' = 'zerado') => {
    return appwrite.databases.listDocuments<RecordZerei>(
      'ZEREI-DB',
      'RECORDS',
      [
        Query.equal('userId', userId),
        Query.equal('type', type),
        Query.limit(250),
        Query.orderDesc('$createdAt'),
      ]
    )
  },
  getUnique: async (userId: string, gameId: string) => {
    return appwrite.databases.listDocuments<RecordZerei>(
      'ZEREI-DB',
      'RECORDS',
      [
        Query.equal('userId', userId),
        Query.equal('game', gameId),
        Query.limit(10),
        Query.orderDesc('$createdAt'),
      ]
    )
  },
  register: async (
    userId: string,
    gameId: string,
    type: 'zerado' | 'backlog'
  ) => {
    return appwrite.databases.createDocument<RecordZerei>(
      'ZEREI-DB',
      'RECORDS',
      ID.unique(),
      { userId, game: gameId, type },
      [
        Permission.update(Role.user(userId)),
        Permission.delete(Role.user(userId)),
      ]
    )
  },
  update: async (recordId: string, type: 'zerado' | 'backlog') => {
    return appwrite.databases.updateDocument<RecordZerei>(
      'ZEREI-DB',
      'RECORDS',
      recordId,
      {
        type,
      }
    )
  },
}
