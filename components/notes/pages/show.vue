<template>
  <NuxtLayout>
    <ContentPage :content="note" />
  </NuxtLayout>
</template>

<script setup>
import ContentPage from '~/components/_common/Content/ContentPage.vue'
import { NOTE } from '../graphql'
import { ref } from 'vue'
import { useHead, useRoute } from '#imports'
import { usePageQuery } from '@trevio/ui'

const route = useRoute()
const note = ref()

try {
  const { data } = await usePageQuery({
    query: `
      query($id: ID!) {
        ${NOTE}
      }
    `,
    variables: {
      id: route.params.noteId
    }
  })

  note.value = data.note

  useHead({
    title: `${data.note.title} - Заметки`,
  })
} catch (error) {
  console.log(error)
}
</script>