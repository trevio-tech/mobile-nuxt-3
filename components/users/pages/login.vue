<template>
  <NuxtLayout heading="Авторизация">
    <LoginForm @login="navigateTo('/')" />
  </NuxtLayout>
</template>

<script setup>
import LoginForm from '~/components/users/components/Authentication/LoginForm.vue'
import { navigateTo,definePageMeta } from '#imports'

definePageMeta({
  middleware: ['auth'],
  auth: 'guest',
})
</script>