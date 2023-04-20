<template>
  <header class="h-[48px] flex-shrink-0 flex items-center bg-white shadow-sm sticky top-0">
    <NuxtLink to="/" class="flex items-center px-4 h-full">
      <img src="/images/logotype.svg" alt="Trevio.ru - о путешествиях" class="w-auto h-[24px]" />
    </NuxtLink>

    <div v-if="$auth.loggedIn" class="ml-auto flex items-center h-full">
      <button @click="overlay.show(TheContentCreationDialog)" class="h-full focus:bg-slate-100 p-4 flex items-center">
        <PlusCircle class="w-5 h-5" />
      </button>
      <DropdownMenu placement="bottom-end" class="ml-auto h-full">
        <template v-slot:default="{ isActive }">
          <div class="flex items-center justify-center h-full px-4" :class="{'bg-slate-100': isActive}">
            <img :src="$auth.user.avatar" :alt="$auth.user.name" class="w-8 h-8 rounded-full block" />
          </div>
        </template>
        <template v-slot:popper="{ hide }">
          <DropdownMenuItem @click="$auth.logout()">Выход</DropdownMenuItem>
        </template>
      </DropdownMenu>
    </div>
    <NuxtLink v-else to="/login" class="flex items-center ml-auto px-4 h-full">Войти</NuxtLink>
  </header>
</template>

<script setup>
import TheContentCreationDialog from './TheContentCreationDialog'
import { DropdownMenu, DropdownMenuItem, useOverlay } from '@trevio/ui'
import { PlusCircle } from 'lucide-vue-next'

const overlay = useOverlay()
</script>