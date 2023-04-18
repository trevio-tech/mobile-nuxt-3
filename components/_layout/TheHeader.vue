<template>
  <header class="h-[48px] flex-shrink-0 flex items-center bg-white shadow-sm sticky top-0">
    <NuxtLink to="/" class="flex items-center px-2 h-full">
      <img src="/images/logotype.svg" alt="Trevio.ru - о путешествиях" class="w-auto h-[24px]" />
    </NuxtLink>
    <NuxtLink v-if="! $auth.loggedIn" to="/login" class="flex items-center ml-auto px-2 h-full">Войти</NuxtLink>
    <DropdownMenu v-else placement="bottom-end" class="ml-auto h-full">
      <template v-slot:default="{ isActive }">
        <div class="flex items-center justify-center h-full px-2 overflow-hidden max-w-[180px]" :class="{'bg-slate-100': isActive}">
          <img :src="$auth.user.avatar" :alt="$auth.user.name" class="w-8 h-8 rounded-full block" />
          <div class="truncate ml-2">{{ $auth.user.name }}</div>
        </div>
      </template>
      <template v-slot:popper="{ hide }">
        <DropdownMenuItem @click="$auth.logout()">Выход</DropdownMenuItem>
      </template>
    </DropdownMenu>
  </header>
</template>

<script setup>
import { DropdownMenu, DropdownMenuItem } from '@trevio/ui'
</script>