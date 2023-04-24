<template>
  <div class="flex items-center justify-between mb-4">
    <ul class="activity-filter">
      <li v-if="$auth.loggedIn"><NuxtLink to="/">Мои лента</NuxtLink></li>
      <li v-if="$auth.loggedIn">·</li>
      <li><NuxtLink to="/new">Все записи</NuxtLink></li>
      <li>·</li>
      <li><NuxtLink to="/top">Топ</NuxtLink></li>
    </ul>
    <DropdownMenu placement="bottom-end">
      <template v-slot:default="{ isActive }">
        <button type="button" class="p-2 bg-slate-200 rounded-lg">
          <Filter class="w-4 h-4" />
        </button>
      </template>
      <template v-slot:popper="{ hide }">
        <DropdownMenuItem to="/travels">Путешествия</DropdownMenuItem>
        <DropdownMenuItem to="/notes">Заметки</DropdownMenuItem>
        <DropdownMenuItem to="/albums">Фотоальбомы</DropdownMenuItem>
        <DropdownMenuItem to="/reviews">Отзывы</DropdownMenuItem>
        <DropdownMenuItem to="/questions">Вопросы</DropdownMenuItem>
      </template>
    </DropdownMenu>
  </div>
</template>

<script setup>
import { Filter } from 'lucide-vue-next'
import { DropdownMenu, DropdownMenuItem } from '@trevio/ui'
</script>

<style>
.activity-filter {
  @apply flex items-center space-x-2 text-sm;
}
.activity-filter .router-link-active {
  @apply underline text-blue-500;
}
</style>