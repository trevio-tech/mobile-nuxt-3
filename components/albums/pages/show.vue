<template>
  <NuxtLayout :heading="album.title">
    <template #sidebar>
      <NuxtLink :to="`/albums/${album.id}/edit`">edit</NuxtLink>
    </template>
    <ContentPage :content="album">
      <template #body>
        <div class="grid grid-cols-4 gap-2">
          <div v-for="image in album.images" :key="image.id" class="aspect-square">
            <img :src="image.url.default" :data-src="image.url.original" :data-id="image.id" alt="" class="w-full h-full object-cover rounded-lg block">
          </div>
        </div>
      </template>
    </ContentPage>
  </NuxtLayout>
</template>

<script setup>
import ContentPage from '~/components/_common/Content/ContentPage.vue'
import { ALBUM } from '~/components/albums/graphql'
import { usePageQuery } from '@trevio/ui'
import { useRoute } from '#imports'

const route = useRoute()

let album = null

try {
  const { data } = await usePageQuery({
    query: `
      query getAlbum($id: ID!) {
        album(id: $id) {
          ${ALBUM}
        }
      }
    `,
    variables: {
      id: route.params.albumId
    }
  })

  album = data.album
} catch (error) {}
</script>