import { addToast } from '$lib/components/ui/Toast.svelte'
import { recordService } from '$lib/services/record.service'

export const recordController = {
  getRecords: async () => {
    try {
      const records = await recordService.get()
      return records
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  registerRecord: async (
    gameId: string,
    userId: string,
    type: 'zerado' | 'backlog'
  ) => {
    try {
      const record = await recordService.register(gameId, userId, type)

      console.log(record)

      addToast({
        data: {
          variant: 'success',
          title: 'Jogo registrado',
          description: 'Que massa, mais um game pra conta.',
        },
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}
