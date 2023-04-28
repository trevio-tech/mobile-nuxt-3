<template>
  <div class="flex flex-col h-full">
    <TheHeader v-model:user-panel="showUserPanel" />
    <main class="flex-1 p-4">
      <h1 v-if="heading" class="mb-4 font-semibold text-xl">{{ heading }}</h1>
      <slot />
    </main>
    <TheUserPanel v-if="showUserPanel" v-model:user-panel="showUserPanel" />
    <TheFooter />
  </div>
</template>

<script setup>
import TheHeader from '~/components/_layout/TheHeader.vue'
import TheFooter from '~/components/_layout/TheFooter.vue'
import TheUserPanel from '~/components/_layout/TheUserPanel.vue'
import { shallowRef } from 'vue'

defineProps({
  heading: {
    type: String
  }
})

const showUserPanel = shallowRef(false)
</script>