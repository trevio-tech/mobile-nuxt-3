<template>
  <NuxtLayout heading="Путешествия">
    <ContentListFilter class="mb-4" />
    <div class="space-y-4">
      <ContentCard v-for="travel in travels" :content="travel" :key="travel.id"/>
    </div>
    <Button v-if="travels.length" :loading="isFetching" @click="fetchTravels" variant="secondary" class="w-full mt-4">Показать еще</Button>
  </NuxtLayout>
</template>

<script setup>
import ContentCard from '~/components/_common/Content/ContentCard.vue'
import ContentListFilter from '~/components/_common/Content/ContentListFilter.vue'
import { TRAVEL_CARD } from '../graphql'
import { shallowRef } from 'vue'
import { usePageQuery, Button } from '@trevio/ui'

const isFetching = shallowRef(false)
const page = shallowRef(0)
const travels = shallowRef([])

const fetchTravels = async () => {
  if (isFetching.value) return

  isFetching.value = true

  page.value++

  try {
    const { data } = await usePageQuery({
      query: `
        query getTravels($page: Int) {
          travels(page: $page) {
            ${TRAVEL_CARD}
          }
        }
      `,
      variables: {
        page: page.value
      }
    })

    travels.value = [...travels.value, ...data.travels]
  } catch (error) {
    console.log(error)
  } finally {
    isFetching.value = false
  }
}

await fetchTravels()
</script>