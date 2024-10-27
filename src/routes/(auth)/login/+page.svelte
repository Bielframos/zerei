<script lang="ts">
  import { invalidateAll } from "$app/navigation"
  import { appwrite } from "$lib/appwrite/client"
  import type { AppwriteException } from "appwrite"

  let formError: null | string = null

  async function handleSubmit(event: Event) {
    event.preventDefault()
    formError = null

    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    console.log(email)
    console.log(password)

    if (!email || !password) {
      formError = "Preencha todos os campos"
      return
    }

    try {
      await appwrite.account.createEmailPasswordSession(email, password)
      await invalidateAll()
    } catch (e) {
      const error = e as AppwriteException
      formError = error.message
    }
  }
</script>

<form on:submit={handleSubmit}>
  <input type="text" name="email" placeholder="user@zerei.com" />
  <input type="password" name="password" placeholder="⁎⁎⁎⁎⁎⁎⁎⁎" />
  <button type="submit">Entrar</button>
  <a href="/recuperar-senha">Recuperar senha</a>

  {#if formError}
    <p>{formError}</p>
  {/if}
</form>
