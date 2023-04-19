<template>
  <NuxtLayout>
    <ContentPage :content="review" />
  </NuxtLayout>
</template>

<script setup>
import ContentPage from '~/components/_common/Content/ContentPage.vue'
import { useHead, useRoute } from '#imports'
import { usePageQuery } from '@trevio/ui'
import { REVIEW } from '~/components/reviews/graphql'

const route = useRoute()
let review = {}

try {
  const { data } = await usePageQuery({
    query: `
      query($id: ID!) {
        review(id: $id) {
          ${REVIEW}
        }
      }
    `,
    variables: {
      id: route.params.reviewId
    }
  })

  useHead({
    title: `${data.review.title} - Отзывы`,
  })

  review = data.review
} catch (error) {
  console.log(error)
}
</script>