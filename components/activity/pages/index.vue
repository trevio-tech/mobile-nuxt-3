<template>
  <NuxtLayout>
    <ContentListFilter class="mb-4" />
    <div class="space-y-2">
      <ContentCard v-for="item in store.items" :key="item.id" :content="item" />
    </div>
    <div v-if="store.items.length" ref="more" class="mt-4 text-center text-sm">
      {{ isFetching ? 'Загружаю...' : '' }}
    </div>
  </NuxtLayout>
</template>

<script setup>
import ContentCard from '~/components/_common/Content/ContentCard.vue'
import ContentListFilter from '~/components/_common/Content/ContentListFilter.vue'
import { FEED } from '~/components/activity/graphql'
import { shallowRef } from 'vue'
import { useActivityStore } from '~/components/activity/store'
import { useIntersectionObserver } from '@vueuse/core'
import { usePageQuery } from '@trevio/ui'
import { useRouter } from '#imports'

const router = useRouter()
const store = useActivityStore()

const isFetching = shallowRef()
const more = shallowRef()

router.beforeEach(async (to, from) => {
  store.$patch({
    previousRouteName: from.name
  })
})

// Если ходим между фильтром в активности, то сбрасываем состояние ленты.
// В остальных случаях состояние сохраняется и возвращаясь в ленту,
// пользователь остается не том же месте.
if (store.previousRouteName && store.previousRouteName.startsWith('activity')) {
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
        is_timeline: router.currentRoute.value.name === 'activity.new',
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