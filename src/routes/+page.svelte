<script lang="ts">
  import { invalidateAll } from "$app/navigation"
  import { appwrite } from "$lib/appwrite/client"

  export let data
  $: loggedIn = !!data.account

  async function logout() {
    await appwrite.account.deleteSession("current")
    await invalidateAll()
  }
</script>

{#if loggedIn}
  <p>Hello {data.account?.name}!</p>
  <button on:click={logout}>Logout</button>
{:else}
  <a href="/login">Acessar</a>
  <a href="/signup">Registrar</a>
{/if}

<footer>
  <ul>
    <li>
      {#if data.account?.labels.includes("owner")}
        <a href="/admin">Zerei Admin</a>
      {/if}
    </li>
  </ul>
</footer>
