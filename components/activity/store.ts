import { defineStore } from 'pinia'

export const useActivityStore = defineStore('activity', {
  state: () => {
    return {
      items: [],
      page: 1,
      previousRouteName: null,
    }
  },
  actions: {
    setItems(items) {
      this.items = [...this.items, ...items]
      this.page++
    },
    resetItems() {
      this.items = []
      this.page  = 0
    }
  },
})