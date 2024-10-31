<script lang="ts">
  import cn from '$lib/utils/cn'
  import { Gamepad2, Library } from 'lucide-svelte'
  import { zereiUserSheetTrigger } from '../modules/ZereiUserSheet.svelte'

  const {
    game,
    recordTag,
    closeSheet,
  }: { game: GameZerei; recordTag?: boolean; closeSheet?: boolean } = $props()
</script>

<a
  href={`/game/${game.slug}`}
  class="relative flex flex-col items-center"
  onclick={() => (closeSheet ? zereiUserSheetTrigger() : () => {})}
>
  <img
    src={game.coverImage}
    alt={`Capa do jogo: ${game.name}`}
    class="rounded-md"
  />
  {#if recordTag && game.records.length < 0}
    {@const record = game.records[0]}
    <div
      class={cn(
        'h-4 w-4 rounded-full text-white',
        record.type === 'zerado' && 'bg-indigo-dark-9',
        record.type === 'backlog' && 'bg-grass-dark-9'
      )}
    >
      {#if record.type === 'zerado'}
        <Gamepad2 />
      {/if}
      {#if record.type === 'backlog'}
        <Library />
      {/if}
    </div>
  {/if}
</a>
