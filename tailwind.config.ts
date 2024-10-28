import type { Config } from "tailwindcss"

export default {
	content: [
		"./src/**/*.{html,js,svelte,ts}",
		".;lib/components/**/*.{html,js,svelte,ts}",
	],
	theme: {
		extend: {},
	},
	plugins: [],
} satisfies Config
