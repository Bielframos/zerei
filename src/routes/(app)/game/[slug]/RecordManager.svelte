<script lang="ts">
  import { Button } from '$lib/components/ui'
  import { cacheController } from '$lib/controllers/cache.controller'
  import { dashboardController } from '$lib/controllers/dashboard.controller'
  import { recordController } from '$lib/controllers/record.controller'
  import { Gamepad2, Library } from 'lucide-svelte'
  import { onMount } from 'svelte'

  const {
    account,
    gameId,
    dashboard,
  }: { account: Account; gameId: string; dashboard: Dashboard | null } =
    $props()
  let record = $state<RecordZerei | undefined>(undefined)

  async function handleRegister(userId: string, type: 'zerado' | 'backlog') {
    let completedAdjustment = 0
    let backlogAdjustment = 0
    const isUpdating = Boolean(record)

    if (isUpdating && record) {
      record = await recordController.updateRecord(record.$id, type)

      if (type === 'zerado') {
        backlogAdjustment--
        completedAdjustment++
        await cacheController.updateRecords('backlog', record.$id)
        await cacheController.updateRecords('zerado', record, true)
      } else {
        completedAdjustment--
        backlogAdjustment++
        await cacheController.updateRecords('zerado', record.$id)
        await cacheController.updateRecords('backlog', record, true)
      }
    } else {
      record = await recordController.registerRecord(userId, gameId, type)
      type === 'zerado' ? completedAdjustment++ : backlogAdjustment++

      await cacheController.updateRecords(type, record, true)
    }

    if (dashboard) {
      await dashboardController.update(userId, {
        completed: dashboard.completedGamesCount + completedAdjustment,
        backlog: dashboard.backlogGamesCount + backlogAdjustment,
      })
    }
  }

  onMount(async () => {
    if (account) {
      const records = await recordController.getUniqueRecord(gameId)
      record = records.total > 0 ? records.documents[0] : undefined
    }
  })
</script>

{#if account}
  <div class="w-full flex gap-4 justify-center">
    <div class="grid auto-rows-min gap-2 text-center">
      <Button
        ariaLabel="Botão de registro de jogo zerado"
        variant="fab-zerei"
        size="fab"
        onclick={() => handleRegister(account.$id, 'zerado')}
        data-registered={record?.type === 'zerado'}
        disabled={record?.type === 'zerado'}
      >
        <Gamepad2 />
      </Button>
      <span class="text-xs">Zerei</span>
    </div>

    <div class="grid auto-rows-min gap-2 text-center">
      <Button
        ariaLabel="Botão de registro de jogo zerado"
        variant="fab-backlog"
        size="fab"
        onclick={() => handleRegister(account.$id, 'backlog')}
        data-registered={record?.type === 'backlog'}
        disabled={record?.type === 'backlog'}
      >
        <Library />
      </Button>
      <span class="text-xs">Backlog</span>
    </div>
  </div>
{/if}
