import { appwrite } from '$lib/utils/appwrite/client'
import { Permission, Role } from 'appwrite'
import { Query } from 'node-appwrite'

export const dashboardService = {
  create: async (userId: string) => {
    return appwrite.databases.createDocument<Dashboard>(
      'ZEREI-DB',
      'DASHBOARDS',
      `DSH-${userId}`,
      { completedGamesCount: 0, backlogGamesCount: 0 },
      [Permission.read(Role.user(userId)), Permission.update(Role.user(userId))]
    )
  },
  get: async (userId: string) => {
    return appwrite.databases.getDocument<Dashboard>(
      'ZEREI-DB',
      'DASHBOARDS',
      `DSH-${userId}`,
      [Query.select(['completedGamesCount', 'backlogGamesCount'])]
    )
  },
  update: async (
    userId: string,
    data: { completed: number; backlog: number }
  ) => {
    return appwrite.databases.updateDocument(
      'ZEREI-DB',
      'DASHBOARDS',
      `DSH-${userId}`,
      { completedGamesCount: data.completed, backlogGamesCount: data.backlog }
    )
  },
}
