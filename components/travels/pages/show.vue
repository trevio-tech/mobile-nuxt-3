<template>
  <NuxtLayout>
    <Html>
      <Head>
        <Title>{{ travel.title }} - Путешествия</Title>
        <Meta name="description" :content="travel.text"/>
      </Head>
    </Html>

    <ContentPage :content="travel" />
  </NuxtLayout>
</template>

<script setup>
import ContentPage from '~/components/_common/Content/ContentPage.vue'
import { TRAVEL } from '../graphql'
import { usePageQuery, ContentList, Button } from '@trevio/ui'
import { useRoute } from '#imports'

const route = useRoute()

let travel = null

try {
  const { data } = await usePageQuery({
    query: `
      query($id: ID!) {
        travel(id: $id) {
          ${TRAVEL}
        }
      }
    `,
    variables: {
      id: route.params.travelId,
    },
  })

  travel = data.travel
} catch (errors) {
  console.log(errors)
}
</script>