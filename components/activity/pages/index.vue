<template>
  <NuxtLayout>
    <div class="space-y-2">
      <ContentCard v-for="item in items" :key="item.id" :content="item" />
    </div>
  </NuxtLayout>
</template>

<script setup>
import ContentCard from '~/components/_common/ContentCard/ContentCard.vue'
import { FEED } from '~/components/activity/graphql'
import { shallowRef } from 'vue'
import { useRoute } from '#imports'
import { usePageQuery } from '@trevio/ui'

const route = useRoute()
const items = shallowRef([])
const page = shallowRef(1)

const getActivity = async () => {
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

    items.value = data.activity
  } catch (errors) {
    console.log(errors)
  }
}

await getActivity()
</script>