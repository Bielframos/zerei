import { invalidateAll } from '$app/navigation'
import { authService } from '$lib/services/auth.service'
import { dashboardService } from '$lib/services/dashboard.service'
import { cacheController } from './cache.controller'

export const authController = {
  logout: async () => {
    await authService.logout()
    cacheController.clearRecords()
    invalidateAll()
  },
  register: async (name: string, email: string, password: string) => {
    try {
      const user = await authService.register(name, email, password)
      await authService.login(email, password)
      await dashboardService.create(user.$id)
      await invalidateAll()
      return user
    } catch (error) {
      console.error('Error registering:', error)
      throw error
    }
  },
}
