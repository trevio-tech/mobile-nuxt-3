<template>
  <NuxtLayout :heading="title">
    <BookmarkCategoriesList class="mb-4" />
    <div v-if="bookmarks.length" class="space-y-4">
      <ContentCard v-for="bookmark in bookmarks" :key="bookmark.id" :content="bookmark" />
    </div>
    <div v-else>В этой категории нет закладок</div>
  </NuxtLayout>
</template>

<script setup>
import BookmarkCategoriesList from '~/components/bookmarks/components/BookmarkCategoriesList'
import ContentCard from '~/components/_common/Content/ContentCard.vue'
import { ALBUM_CARD } from '~/components/albums/graphql'
import { NOTE_CARD } from '~/components/notes/graphql'
import { TRAVEL_CARD } from '~/components/travels/graphql'
import { useBookmarksStore, usePageQuery } from '@trevio/ui'
import { useRoute } from '#imports'


const params = useRoute().params
const store = useBookmarksStore()
const categoryId = parseInt(params.categoryId)

let title = `Закладки`
let bookmarks = []

if (categoryId > 0) {
  store.categories.forEach((category) => {
    if (categoryId === parseInt(category.id)) {
      title += ` из категории «${category.name}»`
    }
  })
}

const query = `
  query ($user_id: ID!, $category_id: ID) {
    bookmarks (user_id: $user_id, category_id: $category_id) {
      ...on Travel {
        ${TRAVEL_CARD}
      }
      ...on Note {
        ${NOTE_CARD}
      }
      ...on Album {
        ${ALBUM_CARD}
      }
    }
  }
`

try {
  const { data } = await usePageQuery({
    query,
    variables: {
      user_id: params.userId,
      category_id: categoryId,
    }
  })

  bookmarks = data.bookmarks
} catch (error) {}
</script>