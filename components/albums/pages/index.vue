<template>
  <NuxtLayout heading="Фотоальбомы">
    <ContentListFilter class="mb-4" />
    <div class="space-y-4">
      <ContentCard v-for="album in albums" :key="album.id" :content="album" />
    </div>
    <Button v-if="albums.length" :loading="isFetching" @click="fetchAlbums" variant="secondary" class="w-full mt-4">Показать еще</Button>
  </NuxtLayout>
</template>

<script setup>
import ContentCard from '~/components/_common/Content/ContentCard.vue'
import ContentListFilter from '~/components/_common/Content/ContentListFilter.vue'
import { ALBUM_CARD } from '~/components/albums/graphql'
import { shallowRef } from 'vue'
import { usePageQuery, Button } from '@trevio/ui'

const isFetching = shallowRef(false)
const page = shallowRef(0)
const albums = shallowRef([])

const fetchAlbums = async () => {
  if (isFetching.value) return

  isFetching.value = true

  page.value++

  try {
    const { data } = await usePageQuery({
      query: `
        query getAlbums($page: Int) {
          albums(page: $page) {
            ${ALBUM_CARD}
          }
        }
      `,
      variables: {
        page: page.value
      }
    })

    albums.value = [...albums.value, ...data.albums]
  } catch (error) {
    console.log(error)
  } finally {
    isFetching.value = false
  }
}

await fetchAlbums()
</script>