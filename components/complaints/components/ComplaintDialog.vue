<template>
  <Dialog title="Жалоба">
    <Form :submit="onSubmit" v-slot="{ isLoading }" class="space-y-4">
      <FormField name="category_id" required label="Категория">
        <label v-for="category in categories" :for="`complaint-category-${category.id}`" :key="category.id" class="flex items-center space-x-1">
          <input type="radio" :id="`complaint-category-${category.id}`" name="category_id" :value="category.id" v-model="form.categoryId">
          <span class="text-sm">{{ category.name }}</span>
        </label>
      </FormField>

      <FormField name="comment" label="Комментарий">
        <Textarea v-model="form.comment" placeholder="Дополнительная информация к жалобе" maxlength="256" />
        <template #help>Необязательное поле</template>
      </FormField>

      <Button class="w-full" type="submit" :loading="isLoading">Отправить</Button>
    </Form>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from '~/components/_common/Dialog.vue'
import { shallowRef, ref } from 'vue'
import { useQuery, Form, FormField, Button, Textarea } from '@trevio/ui'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const emits = defineEmits(['success'])
const props = defineProps<{
  modelType: string
  modelId:   string|number
}>()

const categories = shallowRef([])

const form = ref({
  categoryId: null,
  comment: '',
  ...props,
})

try {
  const { data: { complaintCategories }} = await useQuery({
    query: `
      query getComplaintCategories {
        complaintCategories {
          id
          name
        }
      }
    `
  })

  categories.value = complaintCategories
} catch (error) {
  console.log(error)
}

const onSubmit = async () => {
  const { data } = await useQuery({
    query: /* GraphQL */`
      mutation createComplaint($input: ComplaintInput!) {
        createComplaint(input: $input)
      }
    `,
    variables: {
      input: { ...form.value }
    }
  })

  if (data.createComplaint) {
    toast.success('Ваша жалоба отправлена!', {
      position:   'top-center',
      transition: 'slide',
      autoClose:  1000,
    })

    emits('success')
  }
}
</script>