import { appwrite } from "$lib/utils/appwrite/client"

export const AuthService = {
	login: async (email: string, password: string) => {
		return appwrite.account.createEmailPasswordSession(email, password)
	},
	logout: async () => {
		return appwrite.account.deleteSession("current")
	},
}
