import { defineStore } from 'pinia'

export const useHistoryFactStore = defineStore('historyFact', {
  state: () => ({
    historyFact: 'no fact yet',
  }),
  actions: {
    setHistoryFact(fact: string) {
      this.historyFact = fact
    },
    getHistoryFact() {
      return this.historyFact
    },
  },
})
