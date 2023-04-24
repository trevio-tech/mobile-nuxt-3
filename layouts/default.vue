<template>
  <div class="flex flex-col h-full">
    <TheHeader />
    <main class="flex-1 p-4">
      <h1 v-if="heading" class="mb-4 font-semibold text-xl">{{ heading }}</h1>
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import TheHeader from '~/components/_layout/TheHeader.vue'
import TheFooter from '~/components/_layout/TheFooter.vue'

defineProps({
  heading: {
    type: String
  }
})
</script>