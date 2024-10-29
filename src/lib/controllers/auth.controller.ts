import { invalidateAll } from '$app/navigation'
import { AuthService } from '$lib/services/auth.service'

export const authController = {
  logout: async () => {
    await AuthService.logout()
    invalidateAll()
  },
}
