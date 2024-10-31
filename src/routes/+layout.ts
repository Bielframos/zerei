import { dashboardController } from '$lib/controllers/dashboard.controller'
import { GameController } from '$lib/controllers/game.controller.js'
import { appwrite } from '$lib/utils/appwrite/client'

export const load = async ({ depends }) => {
  depends('data:zerei')
  try {
    const account = await appwrite.account.get()
    return {
      account,
      dashboard: await dashboardController.get(account.$id),
      recentlyAdded: await GameController.getRecentlyAdded(),
    }
  } catch {
    return {
      account: null,
      dashboard: null,
    }
  }
}
