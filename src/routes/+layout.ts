import { dashboardController } from '$lib/controllers/dashboard.controller'
import { appwrite } from '$lib/utils/appwrite/client'

export const load = async () => {
  try {
    const account = await appwrite.account.get()
    return {
      account,
      dashboard: await dashboardController.get(account.$id),
    }
  } catch {
    return {
      account: null,
      dashboard: null,
    }
  }
}
