import { appwrite } from '$lib/utils/appwrite/client'
import { Permission, Role } from 'appwrite'
import { Query } from 'node-appwrite'

export const dashboardService = {
  create: async (userId: string) => {
    return appwrite.databases.createDocument(
      'ZEREI-DB',
      'DASHBOARDS',
      `DSH-${userId}`,
      { completedGamesCount: 0, backlogGamesCount: 0 },
      [Permission.read(Role.user(userId)), Permission.update(Role.user(userId))]
    )
  },
  get: async (userId: string) => {
    return appwrite.databases.getDocument(
      'ZEREI-DB',
      'DASHBOARDS',
      `DSH-${userId}`,
      [Query.select(['completedGamesCount', 'backlogGamesCount'])]
    )
  },
}
