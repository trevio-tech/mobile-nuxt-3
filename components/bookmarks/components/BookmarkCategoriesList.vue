<template>
  <ul>
    <li>
      <NuxtLink :to="{name: 'bookmarks', params: {userId}}" :class="{'bg-gray-100': !categoryId}" class="block p-2 rounded-lg">
        Все {{ store.sumOfEntriesFromAllCategories }}
      </NuxtLink>
    </li>
    <li v-for="category in store.categories" :key="category.id">
      <NuxtLink
        :to="{name: 'bookmarks.category', params: {userId, categoryId: category.id}}"
        :class="{'bg-gray-100': categoryId === parseInt(category.id)}"
        class="flex items-center justify-between p-2 rounded-lg">
        <div>{{ category.name }}</div>
        <div class="flex items-center space-x-1">
          <Lock v-if="category.is_private" class="w-5 h-5" />
          <div class="w-5 text-center">{{ category.content_count }}</div>
        </div>
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup>
import { useRoute } from '#imports'
import { useBookmarksStore } from '@trevio/ui'
import { Lock } from 'lucide-vue-next'

const store = useBookmarksStore()
const params = useRoute().params
const userId = parseInt(params.userId)
const categoryId = parseInt(params.categoryId)
</script>