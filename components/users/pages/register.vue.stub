<template>
  <NuxtLayout heading="Регистрация">
    <RegisterForm @login="navigateTo('/')" />
  </NuxtLayout>
</template>

<script setup>
import RegisterForm from '~/components/users/components/Authentication/RegisterForm.vue'
import { navigateTo, definePageMeta } from '#imports'

definePageMeta({
  middleware: ['guest'],
})
</script>