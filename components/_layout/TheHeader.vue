<template>
  <header class="h-[48px] flex-shrink-0 flex items-center bg-white shadow-sm sticky top-0 z-10">
    <NuxtLink to="/" class="flex items-center px-4 h-full">
      <img src="/images/logotype.svg" alt="Trevio.ru - о путешествиях" class="w-auto h-[24px]" />
    </NuxtLink>

    <div class="ml-auto flex items-center h-full">
      <button @click="showFeedbackDialog" class="h-full focus:bg-slate-100 p-4 flex items-center">
        <Bug class="w-5 h-5" />
      </button>
      <div v-if="$auth.loggedIn" class="flex items-center h-full">
        <button @click="showContentCreationDialog" class="h-full focus:bg-slate-100 p-4 flex items-center">
          <PlusCircle class="w-5 h-5" />
        </button>
        <div @click="$emit('update:userPanel', userPanel = !userPanel)" class="flex items-center justify-center ml-auto h-full px-4">
          <img :src="$auth.user.avatar" :alt="$auth.user.name" class="w-8 h-8 rounded-full block" />
        </div>
      </div>
      <NuxtLink v-else to="/login" class="flex items-center ml-auto px-4 h-full">Войти</NuxtLink>
    </div>
  </header>
</template>

<script setup>
import { useOverlay } from '@trevio/ui'
import { PlusCircle, Bug } from 'lucide-vue-next'
import { defineAsyncComponent } from 'vue'

defineProps({
  userPanel: Boolean
})

const overlay = useOverlay()

const showContentCreationDialog = () => {
  overlay.show(defineAsyncComponent(() => import('~/components/_layout/TheContentCreationDialog.vue')))
}

const showFeedbackDialog = () => {
  overlay.show(defineAsyncComponent(() => import('~/components/feedback/components/FeedbackDialog.vue')), {
    on: {
      success: overlay.hide
    }
  })
}
</script>