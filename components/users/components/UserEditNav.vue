<template>
  <ul class="flex items-center space-x-4 overflow-x-auto">
    <li class="flex-shrink-0"><NuxtLink :to="{name: 'users.edit'}">Основные настройки</NuxtLink></li>
    <li class="flex-shrink-0"><NuxtLink :to="{name: 'users.edit.password'}">Смена пароля</NuxtLink></li>
    <li class="flex-shrink-0"><NuxtLink :to="{name: 'users.edit.contacts'}">Контакты</NuxtLink></li>
  </ul>
</template>

<style scoped>
.router-link-active {
  @apply text-blue-500;
}
</style>