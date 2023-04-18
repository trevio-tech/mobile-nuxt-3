<template>
  <Form :submit="onSubmit" v-slot="{ isLoading }">
    <fieldset class="space-y-2">
      <FormField name="email" v-slot="{ hasError }">
        <Input v-model="form.email" :variant="hasError ? 'danger' : undefined" autocomplete="none" type="email" id="email" placeholder="Электронная почта" />
      </FormField>

      <FormField name="password" v-slot="{ hasError }">
        <Input v-model="form.password"
               :variant="hasError ? 'danger' : undefined"
               autocomplete="none" type="password" id="password" placeholder="Пароль" />
      </FormField>
      <div @click="overlay.show(PasswordSendResetLinkDialog)" class="text-sm text-gray-500 underline cursor-pointer">Восстановить пароль</div>
    </fieldset>

    <Button class="w-full mt-4" type="submit" :loading="isLoading">Войти</Button>

    <SocialLogin />
  </Form>
</template>

<script setup>
import PasswordSendResetLinkDialog from './PasswordSendResetLinkDialog.vue'
import SocialLogin from './SocialLogin.vue'
import { shallowRef } from 'vue'
import { useForm } from 'vee-validate'
import { useNuxtApp } from '#imports'
import { useOverlay, Button, Input, Form, FormField } from '@trevio/ui'

const emit = defineEmits(['login', 'register'])
const overlay = useOverlay()
const { $auth } = useNuxtApp()
const { handleSubmit, setErrors } = useForm()

const form = shallowRef({
  email:    '',
  password: '',
})

const onSubmit = async () => {
  await $auth.loginWith('graphql', {...form.value})
  emit('login')
}
</script>