<template>
  <NuxtLayout>
    <ContentList :userId="route.params.userId" :fields="NESTED_USER_CONTENT" order-by="date">
      <template v-slot="{ items, isMore, isLoading, onFetch }">
        <div class="space-y-4">
          <ContentCard v-for="item in items" :key="item.id" :content="item" />
          <Button v-if="isMore" :loading="isLoading" @click="onFetch" class="w-full" variant="secondary">Показать еще</Button>
        </div>
      </template>
    </ContentList>
  </NuxtLayout>
</template>

<script setup>
import ContentCard from '~/components/_common/Content/ContentCard.vue'
import { Button, ContentList, useOverlay, usePageQuery } from '@trevio/ui'
import { USER, NESTED_USER_CONTENT } from '~/components/users/graphql'
import { shallowRef } from 'vue'
import { useRoute } from '#imports'

const overlay = useOverlay()
const route = useRoute()
const user = shallowRef()

try {
  const { data } = await usePageQuery({
    query: `
      query($id: ID!) {
        user(id: $id) {
          ${USER}
        }
      }
    `,
    variables: {
      id: route.params.userId,
    }
  })

  user.value = data.user
} catch (errors) {
  console.log(errors)
}
</script>