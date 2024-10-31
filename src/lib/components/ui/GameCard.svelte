<script lang="ts">
  import cn from '$lib/utils/cn'
  import { Gamepad2, Library } from 'lucide-svelte'
  import { zereiUserSheetTrigger } from '../modules/ZereiUserSheet.svelte'

  const {
    game,
    recordTag,
    closeSheet,
    className,
  }: {
    game: GameZerei
    recordTag?: boolean
    closeSheet?: boolean
    className?: string
  } = $props()
</script>

<a
  href={`/game/${game.slug}`}
  class={cn('relative flex flex-col items-center', className)}
  onclick={() => (closeSheet ? zereiUserSheetTrigger() : () => {})}
>
  <img
    src={game.coverImage}
    alt={`Capa do jogo: ${game.name}`}
    class="rounded-md"
  />
  {#if recordTag && game.records.length > 0}
    {@const record = game.records[0]}
    <div
      class={cn(
        'absolute z-50 h-6 w-6 rounded-full text-white bottom-2 right-2 flex items-center justify-center shadow-lg',
        record.type === 'zerado' &&
          'bg-indigo-dark-9 border border-indigo-dark-6',
        record.type === 'backlog' &&
          'bg-grass-dark-9 border border-grass-dark-6'
      )}
    >
      {#if record.type === 'zerado'}
        <Gamepad2 size={16} />
      {/if}
      {#if record.type === 'backlog'}
        <Library size={16} />
      {/if}
    </div>
  {/if}
</a>
