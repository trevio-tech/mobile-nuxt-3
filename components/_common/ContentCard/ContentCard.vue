<template>
  <article class="border overflow-hidden rounded-lg shadow-sm">
    <NuxtLink v-if="content.cover" to="/">
      <img :src="content.cover?.url?.default" :alt="content.title" />
    </NuxtLink>
    <div class="bg-white p-4">
      <NuxtLink to="/" class="flex items-center space-x-2 mb-4">
        <img :src="content.user.avatar" :alt="content.user.name" class="w-6 h-6 rounded-full" />
        <div class="text-sm font-medium">{{ content.user.name }}</div>
      </NuxtLink>

      <h2 class="font-semibold mb-2">
        <NuxtLink to="/" class="block">
          {{ content.title }}
        </NuxtLink>
      </h2>
      <NuxtLink v-if="content.text" to="/" class="block text-sm">
        {{ content.text }}
      </NuxtLink>
    </div>
  </article>
</template>

<script setup>
defineProps({
  content: {
    type:     Object,
    required: true,
  }
})
</script>