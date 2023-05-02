<template>
  <div class="place-self-top w-full p-4">
    <div class="flex items-center justify-center overflow-hidden rounded-lg">
      <div class="flex justify-center flex-col px-4 py-8 bg-white h-full flex-shrink-0 overflow-y-auto">
        <NuxtLink to="/" class="block mb-10" title="Trevio.ru - о путешествиях">
          <img src="/images/logotype.svg" alt="Trevio.ru - о путешествиях" class="mx-auto" />
        </NuxtLink>
        <RegisterForm v-if="isRegister" @login="overlay.hide()" />
        <LoginForm v-else @login="overlay.hide()" />

        <Button @click="isRegister = !isRegister" class="w-full mt-2" variant="secondary">
          {{ isRegister ? 'Войти в профиль' : 'Быстрая регистрация' }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'
import { ref } from 'vue'
import { Button, useOverlay } from '@trevio/ui'

const overlay = useOverlay()
const isRegister = ref(false)
</script>