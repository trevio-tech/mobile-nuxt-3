<template>
  <NuxtLayout>
    <div class="space-y-2">
      <ContentCard v-for="item in store.items" :key="item.id" :content="item" />
    </div>
    <div v-if="store.items.length" ref="more" class="py-2 text-center text-sm">
      {{ isFetching ? 'Загружаю...' : '' }}
    </div>
  </NuxtLayout>
</template>

<script setup>
import ContentCard from '~/components/_common/Content/ContentCard.vue'
import { FEED } from '~/components/activity/graphql'
import { shallowRef } from 'vue'
import { useRouter } from '#imports'
import { usePageQuery } from '@trevio/ui'
import { useIntersectionObserver } from '@vueuse/core'
import { useActivityStore } from '~/components/activity/store'

const router = useRouter()
const store = useActivityStore()

const isFetching = shallowRef()
const more = shallowRef()

router.beforeEach(async (to, from) => {
  store.$patch({
    previousRouteName: from.name
  })
})

if (store.previousRouteName === 'activity.new') {
  store.resetItems()
}

if (store.items.length === 0) {
  await getActivity()
}

useIntersectionObserver(
  more,
  async ([{ isIntersecting }]) => {
    if (isIntersecting) {
      await getActivity()
    }
  }
)

async function getActivity() {
  if (isFetching.value) return

  isFetching.value = true

  try {
    const { data } = await usePageQuery({
      query: `
        query getActivity($page: Int, $is_timeline: Boolean) {
          activity (page: $page, is_timeline: $is_timeline) {
            ${FEED}
          }
        }
      `,
      variables: {
        page:        store.page,
        is_timeline: router.currentRoute.name === 'activity.new',
      }
    })

    store.setItems(data.activity)
  } catch (error) {
    console.log(error)
  } finally {
    isFetching.value = false
  }
}
</script>