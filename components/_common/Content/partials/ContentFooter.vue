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

    <div class="ml-auto flex items-center space-x-2">
      <IsLoggedIn>
        <ComplaintButton v-model="bookmarks" :model-type="content.system_name" :model-id="content.id" />
      </IsLoggedIn>
      <IsLoggedIn>
        <BookmarkButton v-model="bookmarks" :model-type="content.system_name" :model-id="content.id" />
      </IsLoggedIn>
    </div>
  </footer>
</template>

<script setup>
import BookmarkButton from '~/components/bookmarks/components/BookmarkButton.vue'
import ComplaintButton from '~/components/complaints/components/ComplaintButton.vue'
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