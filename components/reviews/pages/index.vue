<template>
  <NuxtLayout heading="Отзывы">
    <ContentListFilter class="mb-4" />
    <div class="space-y-4">
      <ContentCard v-for="review in reviews" :content="review" :key="review.id" />
    </div>
    <Button v-if="reviews.length" :loading="isFetching" @click="fetchReviews" variant="secondary" class="w-full mt-4">Показать еще</Button>
  </NuxtLayout>
</template>

<script setup>
import ContentCard from '~/components/_common/Content/ContentCard.vue'
import ContentListFilter from '~/components/_common/Content/ContentListFilter.vue'
import { REVIEW_CARD } from '../graphql';
import { usePageQuery, Button } from '@trevio/ui'

import { shallowRef } from 'vue'

const isFetching = shallowRef(false)
const page = shallowRef(0)
const reviews = shallowRef([])

const fetchReviews = async () => {
  if (isFetching.value) return

  isFetching.value = true

  page.value++

  try {
    const { data } = await usePageQuery({
      query: `
        query getReviews($page: Int) {
          reviews(page: $page) {
            ${REVIEW_CARD}
          }
        }
      `,
      variables: {
        page: page.value
      }
    })

    reviews.value = [...reviews.value, ... data.reviews]
  } catch (error) {
    console.log(error)
  } finally {
    isFetching.value = false
  }
}

await fetchReviews()
</script>