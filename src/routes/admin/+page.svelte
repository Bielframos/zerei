<script lang="ts">
  import { findGame, getUniqueGame } from "$lib/appwrite/utils/gameApi.js"
  import { createGame } from "$lib/appwrite/utils/games.js"
  import { imageUrlBuilder } from "$lib/igdb.js"

  const { data } = $props()
  const gamesList = $derived(data.games)
  let query = $state("")
  let searchedGames: CustomGameFromAppwrite[] = $state([])

  async function handleSearch() {
    try {
      const games = await findGame(query)
      searchedGames = [...games]
    } catch (err) {
      console.log(err)
    }
  }

  async function handleAddGame(id: number) {
    try {
      const game = await getUniqueGame(id)
      if (game) {
        createGame(game)
      }
    } catch (err) {
      console.log(err)
    }
  }
</script>

<h1>Zerei Admin</h1>
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
  <p>{gamesList.total} {gamesList.total > 1 ? "games" : "game"}</p>
{:else}
  <p>Ainda não existem jogos registrados</p>
{/if}
