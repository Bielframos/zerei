<script lang="ts">
  import Dashboard from '$lib/components/modules/Dashboard.svelte'
  import Header from '$lib/components/modules/Header.svelte'
  import Loading from '$lib/components/modules/Loading.svelte'
  import GameCard from '$lib/components/ui/GameCard.svelte'
  import { recordController } from '$lib/controllers/record.controller'
  import { ZereiSummaryGame } from '$lib/models/summaryGame.model'

  const { data } = $props()
  const account = $derived(data.account)
  const dashboard = $derived(data.dashboard)
  let filter = $state<RecordType>('zerado')
  const records = $derived(
    recordController.getRecords(account?.$id || '', filter)
  )
</script>

<main>
  <Header {account} bind:recordsFilter={filter} />

  <Dashboard {dashboard} />

  {#await records}
    <Loading />
  {:then data}
    {#if data.total < 1}
      <div class="py-28 flex flex-col items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 200 200"
          class="h-14"
          ><path
            fill="currentColor"
            fill-rule="evenodd"
            d="M100.182 186.364H100a86.356 86.356 0 0 1-61.133-25.36 86.366 86.366 0 0 1-25.23-61.186l86.545 86.546Zm19.063-2.155L47.327 112.3h138.164a86.464 86.464 0 0 1-21.981 46.219 86.459 86.459 0 0 1-44.265 25.69Zm10.491 11.291C170.455 182.855 200 144.882 200 100 200 44.773 155.227 0 100 0a99.237 99.237 0 0 0-37.5 7.273A100 100 0 0 0 0 100c0 55.227 44.773 100 100 100a99.505 99.505 0 0 0 29.736-4.491v-.009Zm-56.6-177.59 79.4 79.39H13.682c1.136-37.127 25.727-68.363 59.454-79.39Zm17.455-3.755 95.273 95.263a86.354 86.354 0 0 0-24.784-70.487 86.366 86.366 0 0 0-70.49-24.776Z"
            clip-rule="evenodd"
          /></svg
        >
        <h2 class="text-3xl font-normal mt-4">Bem-vindo ao Zerei</h2>
        <p>Registre sua história nos games</p>
      </div>
    {:else}
      <div
        class="flex-1 grid grid-cols-3 gap-2 px-6 overflow-y-auto mt-6 pb-10"
      >
        {#each data.documents as register}
          {@const game = new ZereiSummaryGame(register.game)}
          <GameCard {game} />
        {/each}
      </div>
    {/if}
  {/await}
</main>
