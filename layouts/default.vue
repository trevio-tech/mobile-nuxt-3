<template>
  <div class="flex flex-col h-full">
    <TheHeader v-model:user-panel="userPanel" />
    <main class="flex-1 p-4">
      <h1 v-if="heading" class="mb-4 font-semibold text-xl">{{ heading }}</h1>
      <slot />
    </main>
    <TheUserPanel v-if="showUserPanel" v-model:user-panel="userPanel" />
    <TheFooter />
  </div>
</template>

<script setup>
import TheHeader from '~/components/_layout/TheHeader.vue'
import TheFooter from '~/components/_layout/TheFooter.vue'
import TheUserPanel from '~/components/_layout/TheUserPanel.vue'
import { shallowRef, computed } from 'vue'
import { useAuth } from '#imports'

defineProps({
  heading: {
    type: String
  }
})

const auth = useAuth()

const userPanel = shallowRef(false)
const showUserPanel = computed(() => userPanel.value === true && auth.loggedIn)
</script>