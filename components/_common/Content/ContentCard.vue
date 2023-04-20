<template>
  <article class="border overflow-hidden rounded-lg shadow-sm">
    <NuxtLink v-if="content.cover" :to="to" class="aspect-video">
      <img :src="content.cover?.url?.default" :alt="content.title" class="object-cover" />
    </NuxtLink>
    <div class="bg-white p-4">
      <NuxtLink :to="to" class="flex items-center space-x-2 mb-4">
        <img :src="content.user.avatar" :alt="content.user.name" class="w-6 h-6 rounded-full" />
        <div class="text-sm font-medium">{{ content.user.name }}</div>
      </NuxtLink>

      <h2 class="font-semibold mb-2">
        <NuxtLink :to="to" class="block">
          {{ content.title }}
        </NuxtLink>
      </h2>
      <NuxtLink v-if="content.text" :to="to" class="block text-sm">
        {{ content.text }}
      </NuxtLink>
    </div>

    <ContentFooter :content="content" />
  </article>
</template>

<script setup>
import ContentFooter from '~/components/_common/Content/partials/ContentFooter.vue'

const props = defineProps({
  content: {
    type:     Object,
    required: true,
  }
})

const to = {
  albums: { name: 'albums.show', params: {albumId: props.content.id}},
  notes: { name: 'notes.show', params: {noteId: props.content.id}},
  questions: { name: 'questions.show', params: {questionId: props.content.id}},
  reviews: { name: 'reviews.show', params: {reviewId: props.content.id}},
  travels: { name: 'travels.show', params: {travelId: props.content.id}},
}[props.content.system_name]
</script>