<script lang="ts">
  import { browser } from '$app/environment'
  import { Button } from '$lib/components/ui'
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
        await updateCache('backlog', record.$id)
        await updateCache('zerado', record, true)
      } else {
        completedAdjustment--
        backlogAdjustment++
        await updateCache('zerado', record.$id)
        await updateCache('backlog', record, true)
      }
    } else {
      record = await recordController.registerRecord(gameId, userId, type)
      type === 'zerado' ? completedAdjustment++ : backlogAdjustment++

      await updateCache(type, record, true)
    }

    if (dashboard) {
      await dashboardController.update(userId, {
        completed: dashboard.completedGamesCount + completedAdjustment,
        backlog: dashboard.backlogGamesCount + backlogAdjustment,
      })
    }
  }

  async function updateCache(
    type: 'zerado' | 'backlog',
    record: RecordZerei | string,
    add = false
  ) {
    const cacheKey = `records-${type}`

    if (browser) {
      const cachedData = sessionStorage.getItem(cacheKey)
      let records

      if (cachedData) {
        records = JSON.parse(cachedData)

        if (add) {
          if (records.documents.length >= 12) {
            records.documents.pop()
          }
          records.documents.unshift(record)
          records.total += 1
        } else {
          records.documents = records.documents.filter(
            (doc: RecordZerei) => doc.$id !== record
          )
          records.total = Math.max(0, records.total - 1)
        }
      } else if (add) {
        records = {
          total: 1,
          documents: [record],
        }
      }

      sessionStorage.setItem(cacheKey, JSON.stringify(records))
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
