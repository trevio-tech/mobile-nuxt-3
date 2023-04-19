import { defineNuxtPlugin } from '#imports'
import { watch } from 'vue'
import { useSubscriptionsStore, usePageQuery } from '@trevio/ui'

export default defineNuxtPlugin(async (nuxtApp) => {
  const subscriptionsStore = useSubscriptionsStore()

  const initialState = async (loggedIn) => {
    try {
      const queries = []

      if (loggedIn) {
        queries.push(`
          subscriptions(user_id: ${nuxtApp.$auth.user.id}) {
            model_type
            model_id
          }
        `)
      }

      if (queries.length) {
        const query = `
        query initialState {
          ${queries.join('\n')}
        }
      `

        const {data} = await usePageQuery({
          query,
        }, {
          key: 'initial-state'
        })

        if (loggedIn) {
          if (data.subscriptions.length) {
            subscriptionsStore.$patch({
              subscriptions: data.subscriptions
                  .reduce((accumulator, currentValue) => ({
                    ...accumulator,
                    [currentValue.model_type + currentValue.model_id]: true
                  }), {})
            })
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  watch(() => nuxtApp.$auth.loggedIn, (loggedIn) => {
    initialState(loggedIn)
  }, {
    immediate: true
  })
})