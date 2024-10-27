import { appwrite } from "$lib/appwrite/client"

export const load = async () => {
	try {
		return {
			account: await appwrite.account.get(),
		}
	} catch {
		return {
			account: null,
		}
	}
}
