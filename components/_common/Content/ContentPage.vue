<template>
  <article class="bg-white">
    <header class="flex items-center justify-between space-x-4 mb-4">
      <NuxtLink :to="to" class="flex items-center space-x-2 overflow-hidden">
        <img :src="content.user.avatar" :alt="content.user.name" class="w-6 h-6 rounded-full" />
        <div class="text-sm font-medium truncate">{{ content.user.name }}</div>
      </NuxtLink>
      <NuxtLink v-if="isIam" :to="editLink">Редактировать</NuxtLink>
      <SubscriptionButton v-else v-slot="{ onSubmit, isSubscribed, isLoading }" model-type="users" :model-id="content.user_id">
        <button :loading="isLoading" @click="onSubmit('users', content.user_id)" type="button" class="text-sm">
          {{ isSubscribed ? 'Отписаться' : 'Подписаться' }}
        </button>
      </SubscriptionButton>
    </header>

    <h2 class="font-semibold mb-4 text-xl">{{ content.title }}</h2>

    <ImageViewer closable>
      <slot name="body">
          <div class="prose prose-sm overflow-hidden" v-html="content.text"></div>
      </slot>
    </ImageViewer>

<!--    <div v-if="content.tags && content.tags.length" class="space-x-2 mt-4 text-slate-400 text-sm truncate">
      <NuxtLink
        v-for="tag in content.tags"
        :key="tag.id"
        :title="tag.name"
        :to="{name: 'tags', query: {tag: tag.name}}">#{{ tag.name }}
      </NuxtLink>
    </div>-->

    <ContentFooter class="pt-4" :content="content" />
  </article>
</template>

<script setup>
import ContentFooter from '~/components/_common/Content/partials/ContentFooter.vue'
import { SubscriptionButton, useSubscriptionsStore, ImageViewer } from '@trevio/ui'
import { useAuth } from '#auth/runtime/composables'

const props = defineProps({
  content: {
    type:     Object,
    required: true,
  }
})

const store = useSubscriptionsStore()
const isIam = parseInt(useAuth()?.user?.id) === parseInt(props.content.user_id)

const to = {
  albums: { name: 'albums.show', params: {albumId: props.content.id}},
  notes: { name: 'notes.show', params: {noteId: props.content.id}},
  questions: { name: 'questions.show', params: {questionId: props.content.id}},
  reviews: { name: 'reviews.show', params: {reviewId: props.content.id}},
  travels: { name: 'travels.show', params: {travelId: props.content.id}},
}[props.content.system_name]

const editLink = {
  albums: { name: 'albums.edit', params: {albumId: props.content.id}},
  notes: { name: 'notes.edit', params: {noteId: props.content.id}},
  questions: { name: 'questions.edit', params: {questionId: props.content.id}},
  reviews: { name: 'reviews.edit', params: {reviewId: props.content.id}},
  travels: { name: 'travels.edit', params: {travelId: props.content.id}},
}[props.content.system_name]
</script>