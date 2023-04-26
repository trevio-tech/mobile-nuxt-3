<template>
  <NuxtLayout heading="Смена пароля">
    <UserEditNav class="mb-4" />

    <Form :submit="onSubmit" v-slot="{ isLoading }" class="space-y-4">
      <FormField name="password_old" label="Старый пароль" required v-slot="{ hasError }">
        <Input v-model="form.password_old" id="password-old" type="password" :has-error="hasError" />
      </FormField>
      <FormField name="password" label="Новый пароль" required v-slot="{ hasError }">
        <Input v-model="form.password" id="password" type="password" :has-error="hasError" />
      </FormField>
      <FormField name="password_confirmation" label="Повторите новый пароль" required v-slot="{ hasError }">
        <Input v-model="form.password_confirmation" id="password-confirmation" type="password" :has-error="hasError" />
      </FormField>

      <hr class="-mx-4 border-gray-200">

      <Button type="submit" :loading="isLoading" class="w-full">Сохранить</Button>
    </Form>
  </NuxtLayout>
</template>

<script setup>
import 'vue3-toastify/dist/index.css'
import UserEditNav from '~/components/users/components/UserEditNav.vue'
import { Button, useQuery, Input, Form, FormField } from '@trevio/ui'
import { UPDATE_PASSWORD } from '../graphql'
import { definePageMeta } from '#imports'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import { useAuth } from '#auth/runtime/composables'

definePageMeta({
  middleware: 'auth'
})

const userId = useAuth().user.id

const formInitialState = {
  password_old: '',
  password: '',
  password_confirmation: '',
}

const form = ref({...formInitialState})

const onSubmit = async () => {
  const { data } = await useQuery({
    query: UPDATE_PASSWORD,
    variables: {
      input: {...form.value}
    }
  })

  if (data.updatePassword) {
    form.value = {...formInitialState}

    toast.success('Пароль изменен!', {
      position: 'top-center'
    })
  }
}
</script>