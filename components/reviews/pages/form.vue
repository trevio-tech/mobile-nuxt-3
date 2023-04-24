<template>
  <NuxtLayout :heading="`${isEdit ? 'Редактирование' : 'Создание'} отзыва`">
    <Form :submit="onSubmit" v-slot="{ isLoading }" class="space-y-4">
      <FormField name="input.title" label="Заголовок" required v-slot="{ hasError }">
        <Input v-model="form.title" placeholder="Введите заголовок" :has-error="hasError" />
      </FormField>

      <FormField name="input.place_id" label="Место" required v-slot="{ hasError }">
        <SearchPlace :model-value="form.place" @update:modelValue="form.place_id = $event.id" :has-error="hasError" />
      </FormField>

      <FormField name="input.text" required label="Текст">
        <TipTap model-type="reviews" v-model="form.text" v-model:cover-id="form.cover_id" />
      </FormField>

      <FormField name="input.stars" required label="Оценка">
        <RatingStars v-model="form.stars" />
      </FormField>

      <FormField name="input.tags" label="Теги" id="tags">
        <InputTags v-model="form.tags" />
      </FormField>

      <FormField v-if="travels.length" name="input.travel_id" label="Хотите добавить в путешествие?" id="travel">
        <SelectTravel v-model="form.travel_id" :travels="travels" />
      </FormField>

      <div class="flex justify-end space-x-2">
        <Button :loading="isLoading" type="submit" @click="form.is_draft = true">{{ isEdit ? 'Сохранить' : 'Создать' }} черновик</Button>
        <Button :loading="isLoading" type="submit" @click="form.is_draft = false">{{ isEdit ? 'Сохранить' : 'Создать' }}</Button>
      </div>
    </Form>
  </NuxtLayout>
</template>

<script setup>
import pick from 'lodash.pick'
import { CREATE_REVIEW, REVIEW_FORM, UPDATE_REVIEW } from '../graphql'
import InputTags from '~/components/_common/InputTags.vue'
import { ref } from 'vue'
import { definePageMeta, useNuxtApp, useRoute, useRouter } from '#imports'
import SelectTravel from '~/components/travels/components/SelectTravel.vue'
import { Form, FormField, Input, SearchPlace, TipTap, usePageQuery, RatingStars, Button } from '@trevio/ui'

definePageMeta({
  middleware: 'auth'
})

const form = ref({
  cover_id: null,
  place_id: null,
  travel_id: null,
  title: '',
  stars: 0,
  place: {
    id: null,
    name: ''
  },
  is_draft: false,
  text: '',
  tags: [],
  images: []
})

const route = useRoute()
const reviewId = parseInt(route.params.reviewId)
const isEdit = reviewId > 0
const danger = ref(false)
const travels = ref([])

const app = useNuxtApp()

try {
  const { data } = await usePageQuery({
    query: `
      query(${isEdit ? '$id: ID!, ' : ''}$user_id: ID) {
        ${isEdit ? `review(id: $id) { ${REVIEW_FORM} }` : ''}
        travels(user_id: $user_id) {
          id
          title(words: 10)
          cover {
            id
            url(presets: "default@resize:fill:240:160")
          }
        }
      }
    `,
    variables: {
      id: reviewId,
      user_id: app.$auth.user.id
    }
  })

  travels.value = data.travels

  if (isEdit) {
    Object.assign(form.value, data.review)
  }
} catch (error) {
  console.log(error)
}

const onSubmit = async () => {
  const input = pick(form.value, [
    'cover_id',
    'place_id',
    'travel_id',
    'title',
    'text',
    'tags',
    'is_draft',
    'stars'
  ])

  input.tags = input.tags.map(tag => parseInt(tag.id))

  const { data: { reviewForm }} = await usePageQuery({
    query: isEdit ? UPDATE_REVIEW : CREATE_REVIEW,
    variables: {
      input,
      id: reviewId
    }
  })

  if (reviewForm > 0) {
    await useRouter().push({name: 'reviews.show', params: {reviewId: reviewForm}})
  }
}
</script>