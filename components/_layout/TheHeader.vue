<template>
  <header class="h-[48px] flex-shrink-0 flex items-center bg-white shadow-sm sticky top-0 z-10">
    <NuxtLink to="/" class="flex items-center px-4 h-full">
      <img src="/images/logotype.svg" alt="Trevio.ru - о путешествиях" class="w-auto h-[24px]" />
    </NuxtLink>

    <div v-if="$auth.loggedIn" class="ml-auto flex items-center h-full">
      <button @click="overlay.show(TheContentCreationDialog)" class="h-full focus:bg-slate-100 p-4 flex items-center">
        <PlusCircle class="w-5 h-5" />
      </button>
      <div @click="$emit('update:userPanel', userPanel = !userPanel)" class="flex items-center justify-center ml-auto h-full px-4">
        <img :src="$auth.user.avatar" :alt="$auth.user.name" class="w-8 h-8 rounded-full block" />
      </div>
    </div>
    <NuxtLink v-else to="/login" class="flex items-center ml-auto px-4 h-full">Войти</NuxtLink>
  </header>
</template>

<script setup>
import TheContentCreationDialog from './TheContentCreationDialog'
import { DropdownMenu, DropdownMenuItem, useOverlay } from '@trevio/ui'
import { PlusCircle } from 'lucide-vue-next'

defineProps({
  userPanel: Boolean
})

const overlay = useOverlay()
</script>