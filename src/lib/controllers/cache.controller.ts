import { browser } from '$app/environment'

export const cacheController = {
  updateRecords: async (
    type: 'zerado' | 'backlog',
    record: RecordZerei | string,
    add = false
  ) => {
    const cacheKey = `records-${type}`

    if (browser) {
      const cachedData = localStorage.getItem(cacheKey)
      let records

      if (cachedData) {
        records = JSON.parse(cachedData)

        if (add) {
          if (records.documents.length >= 250) {
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

      localStorage.setItem(cacheKey, JSON.stringify(records))
    }
  },
  clearRecords: async () => {
    localStorage.removeItem('records-zerado')
    localStorage.removeItem('records-backlog')
  },
}
