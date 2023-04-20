<template>
  <NuxtLayout :heading="`${isEdit ? 'Редактирование' : 'Создание'} заметки`">
    <Form :onSubmit="onSubmit" v-slot="{ isLoading }" class="space-y-4">
      <FormField name="input.title" label="Заголовок" required v-slot="{ hasError }">
        <Input v-model="form.title" placeholder="Введите заголовок" :has-error="hasError" />
      </FormField>

      <FormField name="input.text" label="Текст" required v-slot="{ hasError }">
        <TipTap v-model="form.text" :has-error="hasError" model-type="notes" v-model:cover-id="form.cover_id" />
      </FormField>

      <FormField name="input.place_id" label="Место" v-slot="{ hasError }">
        <SearchPlace :model-value="form.place" @update:modelValue="form.place_id = $event.id" />
      </FormField>

      <FormField name="input.tags" label="Теги" id="tags">
        <InputTags v-model="form.tags" />
      </FormField>

<!--      <FormField v-if="data.travels.length" name="input.travel_id" label="Хотите добавить в путешествие?" id="travel">
        <TravelListField v-model="form.travel_id" :travels="data.travels" />
      </FormField>-->

      <div class="flex justify-end space-x-2">
        <Button :loading="isLoading" type="submit" @click="form.is_draft = true">{{ isEdit ? 'Сохранить' : 'Создать' }} черновик</Button>
        <Button :loading="isLoading" type="submit" @click="form.is_draft = false">{{ isEdit ? 'Сохранить' : 'Создать' }}</Button>
      </div>
    </Form>
  </NuxtLayout>
</template>

<script setup>
import pick from 'lodash.pick'
import { CREATE_NOTE, UPDATE_NOTE, NOTE_FORM } from '../graphql'
import InputTags from '~/components/_common/InputTags.vue'
import { ref } from 'vue'
import { definePageMeta, useRoute, useRouter, useNuxtApp } from '#imports'
// import TravelListField from '~/components/modules/travels/components/TravelListField.vue'
import { TipTap, usePageQuery, SearchPlace, Input, Form, FormField, Button } from '@trevio/ui'

definePageMeta({
  middleware: 'auth'
})

const route = useRoute()

const form = ref({
  place_id: null,
  travel_id: null,
  cover_id: null,
  title: '',
  place: {
    id: null,
    name: ''
  },
  is_draft: false,
  text: '',
  tags: [],
})

const noteId = parseInt(route.params.noteId)
const isEdit = noteId > 0
const danger = ref(false)
const loading = ref(false)

const app = useNuxtApp()

const { data } = await usePageQuery({
  query: `
    query(${isEdit ? '$id: ID!, ' : ''}$user_id: ID) {
      ${isEdit ? `note(id: $id) { ${NOTE_FORM} }` : ''}
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
    id: noteId,
    user_id: app.$auth.user.id
  }
})

if (isEdit) {
  Object.assign(form.value, data.note)
}

const onSubmit = async () => {
  const input = pick(form.value, [
    'place_id',
    'travel_id',
    'cover_id',
    'title',
    'text',
    'tags',
    'is_draft',
  ])

  input.tags = input.tags.map(tag => parseInt(tag.id))

  const { data } = await usePageQuery({
    query: isEdit ? UPDATE_NOTE : CREATE_NOTE,
    variables: {
      input,
      id: noteId
    }
  })

  if (data.noteForm > 0) {
    await useRouter().push({name: 'notes.show', params: {noteId: data.noteForm }})
  }
}
</script>