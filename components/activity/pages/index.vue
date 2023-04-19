<template>
  <NuxtLayout>
    <div class="space-y-2">
      <ContentCard v-for="item in items" :key="item.id" :content="item" />
      <div ref="more" class="p-2 text-center text-sm">
        {{ isFetching ? 'Загружаю...' : '' }}
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import ContentCard from '~/components/_common/Content/ContentCard.vue'
import { FEED } from '~/components/activity/graphql'
import { shallowRef } from 'vue'
import { useRoute } from '#imports'
import { usePageQuery } from '@trevio/ui'
import { useIntersectionObserver } from '@vueuse/core'

const route = useRoute()
const items = shallowRef([])
const page = shallowRef(1)
const more = shallowRef()
const isFetching = shallowRef()

const getActivity = async () => {
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
        page: page.value++,
        is_timeline: route.name === 'activity.new'
      }
    })

    items.value = [...items.value, ...data.activity]
  } catch (error) {
    console.log(error)
  } finally {
    isFetching.value = false
  }
}

await getActivity()

useIntersectionObserver(
  more,
  async ([{ isIntersecting }]) => {
    if (isIntersecting) {
      await getActivity()
    }
  }
)
</script>