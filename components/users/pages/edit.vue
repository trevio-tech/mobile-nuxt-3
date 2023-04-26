<template>
  <NuxtLayout heading="Редактирование профиля">
    <UserEditNav class="mb-4" />

    <Form :submit="onSubmit" v-slot="{ isLoading }" class="space-y-4">
      <FormField
          name="name"
          label="Отображаемое имя"
          required
          v-slot="{ hasError }">
        <Input v-model="form.name" placeholder="Ваш ник, имя и/или фамилия или название компании" :has-error="hasError" />
      </FormField>

      <FormField name="description" label="Описание" v-slot="{ hasError }">
        <Textarea v-model="form.description" rows="3" placeholder="Пара слов о себе" />
      </FormField>

      <FormField name="place_id" label="Откуда вы?" v-slot="{ hasError }">
        <SearchPlace v-model="form.place" @update:modelValue="form.place_id = $event.id" />
      </FormField>

      <FormField name="gender" label="Пол" v-slot="{ hasError }">
        <select v-model="form.gender" class="input">
          <option disabled value="">Ничего не выбрано</option>
          <option v-for="gender in genders" :key="gender.id" :value="gender.id">{{ gender.name }}</option>
        </select>
      </FormField>

      <FormField name="birthday" label="День рождения" v-slot="{ hasError }">
        <Input v-model="form.birthday" type="date" />
      </FormField>

      <hr class="-mx-4 border-gray-200">

      <Button type="submit" :loading="isLoading" class="w-full">Сохранить</Button>
    </Form>
  </NuxtLayout>
</template>

<script setup>
import UserEditNav from '~/components/users/components/UserEditNav.vue'
import { usePageQuery, SearchPlace, Button, Input, Form, FormField, Textarea } from '@trevio/ui'
import { ref } from 'vue'
import { UPDATE_USER } from '../graphql'
import { PLACE_WITH_PARENTS_FIELDS } from '~/components/places/graphql'
import { useAuth } from '#auth/runtime/composables'
import { definePageMeta } from '#imports'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

definePageMeta({
  middleware: 'auth'
})

const form = ref({
  place_id: null,
  name: '',
  description: '',
  birthday: null,
  gender: null
})

const genders = [{id: null, name: 'Другой'}, {id: 'male', name: 'Мужской'}, {id: 'female', name: 'Женский'}]

const userId = parseInt(useAuth().user.id)

try {
  const { data: { user } } = await usePageQuery({
    query: `
      query($id: ID!) {
        user(id: $id) {
          id
          name
          description
          birthday(format: "Y-m-d")
          gender
          place {
            ${PLACE_WITH_PARENTS_FIELDS}
          }
        }
      }
    `,
    variables: {
      id: userId
    }
  })

  Object.assign(form.value, user)
} catch (error) {}

const onSubmit = async () => {
  const input = {...form.value}

  delete input.id
  delete input.__typename
  delete input.place

  const { data: { updateUser } } = await usePageQuery({
    query: `
        ${UPDATE_USER}
      `,
    variables: {
      id: userId,
      input
    }
  })

  if (updateUser) {
    toast.success('Настройки сохранены!', {
      autoClose: 1000,
      theme: 'dark',
      position: 'top-center',
      transition: 'slide'
    })
  }
}
</script>