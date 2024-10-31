import { addToast } from '$lib/components/ui/Toast.svelte'
import { recordService } from '$lib/services/record.service'

export const recordController = {
  getUniqueRecord: async (gameId: string) => {
    try {
      const records = await recordService.getUnique(gameId)
      return records
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  getRecords: async (type?: 'zerado' | 'backlog') => {
    try {
      const records = await recordService.get(type)
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

      addToast({
        data: {
          variant: 'success',
          title: 'Jogo registrado',
          description: 'Que massa, mais um game pra conta.',
        },
      })

      return record
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  updateRecord: async (recordId: string, type: 'zerado' | 'backlog') => {
    try {
      const updatedRecord = await recordService.update(recordId, type)

      addToast({
        data: {
          variant: 'success',
          title: 'Registro atualizado',
          description: `O jogo está marcado como ${type}.`,
        },
      })

      return updatedRecord
    } catch (error) {
      console.error('Errro to update record:', error)
      throw error
    }
  },
}
