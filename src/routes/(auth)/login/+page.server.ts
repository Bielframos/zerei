import { SESSION_COOKIE, createAdminClient } from "$lib/server/appwrite.js";
import { redirect } from "@sveltejs/kit";

export const actions = {
	login: async ({ request, cookies }) => {
		const form = await request.formData();
		const email = form.get("email") as string;
		const password = form.get("password") as string;

		const { account } = createAdminClient();

		const session = await account.createEmailPasswordSession(email, password);

		cookies.set(SESSION_COOKIE, session.secret, {
			sameSite: "strict",
			expires: new Date(session.expire),
			secure: true,
			path: "/",
		});

		redirect(302, "/");
	},
};
