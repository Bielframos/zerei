import { appwrite } from '$lib/utils/appwrite/client'
import { ID } from 'appwrite'

export const authService = {
  login: async (email: string, password: string) => {
    return appwrite.account.createEmailPasswordSession(email, password)
  },
  logout: async () => {
    return appwrite.account.deleteSession('current')
  },
  register: async (name: string, email: string, password: string) => {
    return appwrite.account.create(ID.unique(), email, password, name)
  },
}
