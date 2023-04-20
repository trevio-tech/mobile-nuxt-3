<template>
  <footer>
    <Like
      :count="content.likes_count"
      :is-liked="content.like?.is_liked"
      :model-id="content.id"
      :model-type="content.system_name"
    />
  </footer>
</template>

<script setup>
import { Like } from '@trevio/ui'

const props = defineProps({
  content: {
    type:     Object,
    required: true,
  }
})
</script>