import { dashboardService } from '$lib/services/dashboard.service'

export const dashboardController = {
  get: async (userId: string) => {
    try {
      const dashboard = await dashboardService.get(userId)
      return dashboard
    } catch (error) {
      console.error('Error getting dashboard:', error)
      throw error
    }
  },
}
