<template>
  <Dialog title="Обратная связь">
    <Form :submit="onSubmit" v-slot="{ isLoading }" class="space-y-4">
      <FormField name="category_id" required label="Категория">
        <label v-for="category in categories" :for="`complaint-category-${category.id}`" :key="category.id" class="flex items-center space-x-1">
          <input type="radio" :id="`complaint-category-${category.id}`" name="category_id" :value="category.id" v-model="form.categoryId">
          <span class="text-sm">{{ category.name }}</span>
        </label>
      </FormField>

      <FormField name="email" label="Ваше имя" required v-slot="{ hasError }">
        <Input v-model="form.name" maxlength="25" :has-error="hasError" />
      </FormField>

      <FormField name="email" label="Контактный email" required v-slot="{ hasError }">
        <Input v-model="form.email" maxlength="35" :has-error="hasError" />
      </FormField>

      <FormField name="text" label="Комментарий" required v-slot="{ hasError }">
        <Textarea v-model="form.text" maxlength="1000" :has-error="hasError" />
      </FormField>

      <Button class="w-full" type="submit" :loading="isLoading">Отправить</Button>
    </Form>
  </Dialog>
</template>

<script setup>
import 'vue3-toastify/dist/index.css'
import Dialog from '~/components/_common/Dialog.vue'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import { useAuth } from '#imports'
import { useQuery, Form, FormField, Button, Textarea, Input } from '@trevio/ui'

const emits = defineEmits(['success'])
const auth = useAuth()

const categories = ref([])
const form = ref({
  categoryId: null,
  email:      '',
  name:       '',
  text:       '',
})

if (auth.loggedIn) {
  form.value.name = auth.user.name
  form.value.email = auth.user.email
}

try {
  const { data } = await useQuery({
    query: `
      query getFeedbackCategories {
        feedbackCategories {
          id
          name
        }
      }
    `
  })

  categories.value = data.feedbackCategories
} catch (error) {
  console.log(error)
}

const onSubmit = async () => {
  const { data } = await useQuery({
    query: /* GraphQL */`
      mutation createFeedback($input: FeedbackInput!) {
        createFeedback(input: $input)
      }
    `,
    variables: {
      input: { ...form.value }
    }
  })

  if (data.createFeedback) {
    toast.success('Отправлено!', {
      position:   'top-center',
      transition: 'slide',
      autoClose:  1000,
    })

    emits('success')
  }
}
</script>