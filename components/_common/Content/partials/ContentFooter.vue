<template>
  <footer class="flex items-center justify-between">
    <IsLoggedIn>
      <Like
        :count="content.likes_count"
        :is-liked="content.like?.is_liked"
        :model-id="content.id"
        :model-type="content.system_name"
      />
    </IsLoggedIn>

    <IsLoggedIn class="ml-auto">
      <BookmarkButton v-model="bookmarks" :model-type="content.system_name" :model-id="content.id" />
    </IsLoggedIn>
  </footer>
</template>

<script setup>
import BookmarkButton from '~/components/bookmarks/components/BookmarkButton.vue'
import { IsLoggedIn, Like } from '@trevio/ui'
import { inject } from 'vue'

const props = defineProps({
  content: {
    type:     Object,
    required: true,
  },
})

const bookmarks = inject('bookmarks')
</script>