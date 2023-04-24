<template>
  <NuxtLayout heading="Вопросы">
    <ContentListFilter class="mb-4" />
    <div class="space-y-4">
      <ContentCard v-for="question in questions" :key="question.id" :content="question "/>
    </div>
    <Button v-if="questions.length" :loading="isFetching" @click="fetchQuestions" variant="secondary" class="w-full mt-4">Показать еще</Button>
  </NuxtLayout>
</template>

<script setup>
import ContentCard from '~/components/_common/Content/ContentCard.vue'
import ContentListFilter from '~/components/_common/Content/ContentListFilter.vue'
import { Button, usePageQuery } from '@trevio/ui'
import { QUESTION_CARD } from '../graphql'
import { shallowRef } from 'vue'
import { useHead } from '#imports'

useHead({
  title: 'Вопросы и ответы'
})

const isFetching = shallowRef(false)
const page = shallowRef(0)
const questions = shallowRef([])

const fetchQuestions = async () => {
  if (isFetching.value) return

  isFetching.value = true

  page.value++

  try {
    const { data } = await usePageQuery({
      query: `
        query getQuestions($page: Int) {
          questions(page: $page) {
            ${QUESTION_CARD}
          }
        }
      `,
      variables: {
        page: page.value
      }
    })

    questions.value = [...questions.value, ...data.questions]
  } catch (error) {
    console.log(error)
  } finally {
    isFetching.value = false
  }
}

await fetchQuestions()
</script>