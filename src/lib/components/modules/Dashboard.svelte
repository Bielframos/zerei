<script lang="ts">
  const { dashboard }: { dashboard: Dashboard | null } = $props()
</script>

{#if dashboard}
  <div class="flex gap-2 px-6">
    <div
      class="rounded-md bg-gradient-to-r from-indigo-dark-9 to-indigo-dark-10 p-4 flex-1"
    >
      <p class="text-4xl font-normal">{dashboard.completedGamesCount}</p>
      <p class="text-sm">Jogos zerados</p>
    </div>

    <div
      class="rounded-md bg-gradient-to-r from-grass-dark-9 to-grass-dark-10 p-4 flex-1"
    >
      <p class="text-4xl font-normal">{dashboard.backlogGamesCount}</p>
      <p class="text-sm">Jogos no backlog</p>
    </div>
  </div>
{/if}
