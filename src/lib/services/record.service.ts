import { appwrite } from '$lib/utils/appwrite/client'
import { ID, Permission, Query, Role } from 'appwrite'

export const recordService = {
  get: async (type: 'zerado' | 'backlog' = 'zerado') => {
    return appwrite.databases.listDocuments<RecordZerei>(
      'ZEREI-DB',
      'RECORDS',
      [
        Query.equal('type', type),
        Query.limit(10),
        Query.orderDesc('$createdAt'),
      ]
    )
  },
  getUnique: async (gameId: string) => {
    return appwrite.databases.listDocuments<RecordZerei>(
      'ZEREI-DB',
      'RECORDS',
      [
        Query.equal('game', gameId),
        Query.limit(10),
        Query.orderDesc('$createdAt'),
      ]
    )
  },
  register: async (
    gameId: string,
    userId: string,
    type: 'zerado' | 'backlog'
  ) => {
    return appwrite.databases.createDocument<RecordZerei>(
      'ZEREI-DB',
      'RECORDS',
      ID.unique(),
      { game: gameId, type },
      [
        Permission.read(Role.user(userId)),
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
