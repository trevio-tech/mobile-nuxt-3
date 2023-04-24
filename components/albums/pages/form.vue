<template>
  <NuxtLayout :heading="`${isEdit ? 'Редактирование' : 'Создание'} фотоальбома`">
    <Form :submit="onSubmit" v-slot="{ isLoading }" class="space-y-4">
      <FormField name="input.title" label="Заголовок" required  v-slot="{ hasError }">
        <Input v-model="form.title" placeholder="Введите заголовок" :has-error="hasError" />
      </FormField>

      <FormField
        help="Изображения можно сортировать. Первое изображение будет использовано в качестве обложки."
        label="Изображения"
        name="input.images"
        required
      >
        <FormGallery v-if="form.images" v-model="form.images" class="mb-4" />
        <Upload :fields="fields" :input="{model_type: 'albums'}" v-model="form.images" с>
          <Button>Добавить фото</Button>
        </Upload>
      </FormField>

      <FormField name="input.text" label="Текст">
        <Textarea placeholder="Краткое описание" rows="2" v-model="form.text" />
      </FormField>

      <FormField name="input.place_id" label="Место" v-slot="{ hasError }">
        <SearchPlace :model-value="form.place" @update:modelValue="form.place_id = $event.id" />
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
import FormGallery from '~/components/albums/components/FormGallery.vue'
import InputTags from '~/components/_common/InputTags.vue'
import SelectTravel from '~/components/travels/components/SelectTravel.vue'
import { CREATE_ALBUM, UPDATE_ALBUM, ALBUM_FORM } from '../graphql'
import { Upload, usePageQuery, Button, SearchPlace, Input, Form, FormField, Textarea } from '@trevio/ui'
import { pick } from 'lodash'
import { ref } from 'vue'
import { useRoute, useRouter, useNuxtApp, definePageMeta } from '#imports'


definePageMeta({
  middleware: 'auth'
})

const fields = ['id', 'url(presets: "default@width:640,height:480")']

const form = ref({
  place_id: null,
  travel_id: null,
  title: '',
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
const albumId = parseInt(route.params.albumId)
const isEdit = albumId > 0
const danger = ref(false)
let travels = []

const app = useNuxtApp()

try {
  const { data } = await usePageQuery({
    query: `
      query(${isEdit ? '$id: ID!, ' : ''}$user_id: ID) {
        ${isEdit ? `album(id: $id) { ${ALBUM_FORM} }` : ''}
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
      id: albumId,
      user_id: app.$auth.user.id
    }
  })

  travels = data.travels

  if (isEdit) {
    Object.assign(form.value, data.album)
  }
} catch (error) {}

const onSubmit = async () => {
  const input = pick(form.value, [
    'place_id',
    'travel_id',
    'is_draft',
    'title',
    'text',
    'tags',
    'images',
  ])

  input.tags = input.tags.map(tag => tag.id)
  input.images = input.images.map(image => image.id)

  const { data: { albumForm }} = await usePageQuery({
    query: isEdit ? UPDATE_ALBUM : CREATE_ALBUM,
    variables: {
      id: albumId,
      input
    }
  })

  if (albumForm > 0) {
    await useRouter().push({name: 'albums.show', params: {albumId: albumForm}})
  }
}
</script>