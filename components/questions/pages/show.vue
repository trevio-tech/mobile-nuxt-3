<template>
  <NuxtLayout>
    <ContentPage :content="question" />
  </NuxtLayout>
</template>

<script setup>
import ContentPage from '~/components/_common/Content/ContentPage.vue'
import { QUESTION } from '../graphql'
import { ref } from 'vue'
import { useHead, useRoute } from '#imports'
import { usePageQuery } from '@trevio/ui'

const route = useRoute()
const question = ref()

try {
  const { data } = await usePageQuery({
    query: `
      query getQuestion($id: ID!) {
        question(id: $id) {
          ${QUESTION}
        }
      }
    `,
    variables: {
      id: route.params.questionId
    }
  })

  question.value = data.question

  useHead({
    title: `${data.question.title} - Вопросы и ответы`,
  })
} catch (error) {
  console.log(error)
}
</script>