<template>
  <article class="border overflow-hidden rounded-lg shadow-sm">
    <NuxtLink v-if="content.cover" :to="to" class="aspect-video">
      <img :src="content.cover?.url?.default" :alt="content.title" class="object-cover" />
    </NuxtLink>

    <div class="bg-white p-4">
      <header class="flex flex-row items-center justify-between space-x-4 mb-4">
        <NuxtLink :to="{name: 'users.show', params: {userId: content.user.id}}" class="basis-2/3 flex items-center space-x-2 overflow-hidden">
          <img :src="content.user.avatar" :alt="content.user.name" class="w-6 h-6 rounded-full" />
          <div class="text-sm font-medium truncate">{{ content.user.name }}</div>
        </NuxtLink>
        <div class="basis-1/3 text-sm text-gray-500 whitespace-nowrap">{{ content.published_at }}</div>
      </header>

      <h2 class="font-semibold mb-2">
        <NuxtLink :to="to" class="block">
          {{ content.title }}
        </NuxtLink>
      </h2>
      <NuxtLink v-if="content.text" :to="to" class="block text-sm overflow-hidden">
        {{ content.text }}
      </NuxtLink>

      <div v-if="content.place" class="mt-4">
        {{ content.place.full_name }}
      </div>
    </div>

    <ContentFooter class="px-4 pb-4" :content="content" />
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