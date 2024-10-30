import { redirect } from '@sveltejs/kit'

export const load = async ({ parent }) => {
  const { account } = await parent()

  if (account) {
    redirect(303, '/')
  }
}
