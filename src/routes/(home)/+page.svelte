<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte'
  import { Ellipsis, Plus } from 'lucide-svelte'
  import Menu from './Menu.svelte'

  const { data } = $props()
  let account = $derived(data.account)

  // const gamesList = $derived(data.games)
  // let query = $state("")
  // let searchedGames: CustomGameFromAppwrite[] = $state([])

  // async function handleSearch() {
  //   try {
  //     const games = await findGame(query)
  //     searchedGames = [...games]
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // async function handleAddGame(id: number) {
  //   try {
  //     const game = await getUniqueGame(id)
  //     if (game) {
  //       createGame(game)
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // async function logout() {
  //   await appwrite.account.deleteSession("current")
  //   await invalidateAll()
  // }
</script>

<header class="pt-10 pb-4 px-6 flex justify-between">
  <h1 class="text-3xl">Zerei</h1>

  <Menu {account} />
</header>

<div
  class="absolute bottom-0 w-full pb-6 pt-8 flex justify-center bg-gradient-to-b from-transparent to-indigo-dark-1 backdrop-blur-lg"
>
  <Button ariaLabel="Botão de busca" size="fab"><Plus /></Button>
</div>

<!-- {#if loggedIn}
  <p>Hello {data.account?.name}!</p>
  <button onclick={logout}>Logout</button>
{:else}
  <a href="/login">Acessar</a>
  <a href="/signup">Registrar</a>
{/if}

<form onsubmit={handleSearch}>
  <input
    type="search"
    id="search"
    name="search"
    placeholder="Busque por um game"
    bind:value={query}
  />
  <button type="submit">buscar</button>
</form>

{#if searchedGames.length > 0}
  <h2>Resultados para "{query}"</h2>
  {#each searchedGames as game}
    {@const releaseDate = new Date(game.first_release_date * 1000)}
    <article>
      {#if game.cover}
        <img
          src={imageUrlBuilder(game.cover.image_id, "cover_small")}
          alt={`Capa do jogo: ${game.name}`}
        />
      {:else}
        <span>Sem foto</span>
      {/if}
      <h4>{game.name}</h4>
      <span>{releaseDate.getFullYear()}</span>
      <button onclick={() => handleAddGame(game.id)}>adicionar</button>
    </article>
  {/each}

  <hr />
{/if}

{#if gamesList.total > 0}
  {#each gamesList.documents as game}
    <article>
      {#if game.coverImage}
        <img src={game.coverImage} alt={`Capa do jogo: ${game.name}`} />
      {:else}
        <span>Sem foto</span>
      {/if}
      <h4>{game.name}</h4>
      <span>{new Date(game.releaseDate).getFullYear()}</span>
      <button onclick={() => deleteGame(game.$id)}>excluir</button>
    </article>
  {/each}
  <p>{gamesList.total} {gamesList.total > 1 ? "games" : "game"}</p>
{:else}
  <p>Ainda não existem jogos registrados</p>
{/if} -->
