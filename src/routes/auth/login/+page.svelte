<script lang="ts">
  import { invalidateAll } from '$app/navigation'
  import { Button } from '$lib/components/ui'
  import { authService } from '$lib/services/auth.service'
  import type { AppwriteException } from 'appwrite'

  let formError: null | string = null

  async function handleSubmit(event: Event) {
    event.preventDefault()
    formError = null

    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      await authService.login(email, password)
      await invalidateAll()
    } catch (e) {
      const error = e as AppwriteException
      formError = error.message
    }
  }
</script>

<form on:submit={handleSubmit} class="grid p-6 gap-4">
  <input
    type="text"
    name="email"
    placeholder="user@zerei.com"
    class="px-4 py-2 rounded-md bg-transparent border border-slate-dark-6"
    required
  />
  <input
    type="password"
    name="password"
    placeholder="⁎⁎⁎⁎⁎⁎⁎⁎"
    class="px-4 py-2 rounded-md bg-transparent border border-slate-dark-6"
    required
  />
  <Button ariaLabel="Acessar o Zerei" type="submit">Entrar</Button>

  {#if formError}
    <p>{formError}</p>
  {/if}
</form>
