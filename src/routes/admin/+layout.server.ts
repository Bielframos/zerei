import { redirect, type ServerLoad } from "@sveltejs/kit"

export const load: ServerLoad = ({ locals }) => {
	if (!locals.user || !locals.user.labels.includes("owner")) {
		redirect(302, "/")
	}

	return {}
}
