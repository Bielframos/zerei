<script lang="ts">
  import { Button } from '$lib/components/ui'
  import { recordController } from '$lib/controllers/record.controller'
  import { Gamepad2, Library } from 'lucide-svelte'
  import { onMount } from 'svelte'

  const { account, gameId }: { account: Account; gameId: string } = $props()
  let record = $state<RecordZerei | undefined>(undefined)

  async function handleRegister(userId: string, type: 'zerado' | 'backlog') {
    if (record) {
      const updatedRecord = await recordController.updateRecord(
        record.$id,
        type
      )

      record = updatedRecord
    }

    const newRecord = await recordController.registerRecord(
      gameId,
      userId,
      type
    )

    record = newRecord
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
