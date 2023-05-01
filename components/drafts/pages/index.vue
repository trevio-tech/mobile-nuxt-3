<template>
  <NuxtLayout heading="Мои черновики">
    <template #sidebar>
      123
    </template>
    <div v-if="drafts.length > 0" class="rounded-lg overflow-hidden divide-y">
      <ContentCard v-for="draft in drafts" :key="draft.id" :content="draft" />
    </div>
    <div v-else>У вас нет черновиков.</div>
  </NuxtLayout>
</template>

<script setup>
import ContentCard from '~/components/_common/Content/ContentCard.vue'
import { NOTE_CARD } from '~/components/notes/graphql'
import { REVIEW_CARD } from '~/components/reviews/graphql'
import { TRAVEL_CARD } from '~/components/travels/graphql'
import { ALBUM_CARD } from '~/components/albums/graphql'
import { QUESTION_CARD } from '~/components/questions/graphql'
import { shallowRef } from 'vue'
import { usePageQuery } from '@trevio/ui'

const drafts = shallowRef([])

try {
  const { data } = await usePageQuery({
    query: `
      query getDrafts {
        drafts {
          ... on Note {
            ${NOTE_CARD}
          }
          ... on Travel {
            ${TRAVEL_CARD}
          }
          ... on Review {
            ${REVIEW_CARD}
          }
          ...on Album {
            ${ALBUM_CARD}
          }
          ...on Question {
            ${QUESTION_CARD}
          }
        }
      }
    `,
    variables: {
    }
  })

  drafts.value = data.drafts
} catch (errors) {
  console.log(errors)
}
</script>