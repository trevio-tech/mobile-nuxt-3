<template>
  <NuxtLayout :heading="`${isEdit ? 'Редактирование' : 'Создание'} путешествия`">
    <Form :submit="onSubmit" v-slot="{ isLoading }" class="space-y-4">
      <FormField name="input.images">
        <TravelUpload v-model="form.cover" />
      </FormField>

        <FormField name="input.title" label="Заголовок" required v-slot="{ hasError }">
          <Input v-model="form.title" placeholder="Введите заголовок" :has-error="hasError" />
        </FormField>

        <FormField name="input.place_id" label="Страна" required v-slot="{ hasError }">
          <SearchPlace v-model="form.place" :search-by="searchBy" :has-error="hasError" @update:modelValue="form.place_id = $event.id" />
        </FormField>

        <FormField name="input.text" label="Анонс" v-slot="{ hasError }">
          <Textarea v-model="form.text" rows="3" placeholder="Краткое описание" :has-error="hasError" />
        </FormField>

        <FormField name="input.tags" label="Теги" id="tags" v-slot="{ hasError }">
          <InputTags v-model="form.tags" />
        </FormField>

<!--        <FormField name="input.date_start" label="Дата начала и завершения" id="date" v-slot="{ hasError }">
          <Datepicker
            :model-value="[form.date_start, form.date_end]"
            :enable-time-picker="false"
            range
            multi-calendars
            multi-calendars-solo
            position="right"
            auto-apply
            @update:modelValue="onDateChange"
          >
            <template #trigger>
              <Input :model-value="readableDateStartDateEnd" placeholder="Дата начала и завершения" :has-error="hasError" />
            </template>
          </Datepicker>
        </FormField>-->

      <div class="gap-4">
        <FormField name="input.budget" label="Бюджет путешествия" id="budget">
          <Input v-model="form.budget" type="number" id="budget" placeholder="Бюджет путешествия" />
        </FormField>

        <div class="space-y-1 mt-2">
          <div v-for="currency in currencies" :key="currency.id">
            <label :for="`currency-${currency.id}`" class="flex items-center space-x-1">
              <input v-model="form.currency_id" :value="currency.id" type="radio" name="currency" :id="`currency-${currency.id}`" />
              <span class="text-sm">{{ currency.name }}</span>
            </label>
          </div>
        </div>
      </div>

      <div class="flex justify-end space-x-2">
        <Button :loading="isLoading" type="submit" @click="form.is_draft = true">{{ isEdit ? 'Сохранить' : 'Создать' }} черновик</Button>
        <Button :loading="isLoading" type="submit" @click="form.is_draft = false">{{ isEdit ? 'Сохранить' : 'Создать' }}</Button>
      </div>
    </Form>
  </NuxtLayout>
</template>

<script setup>
import InputTags from '~/components/_common/InputTags.vue'
import TravelUpload from '../components/TravelUpload'
import { TRAVEL_FORM, CREATE_TRAVEL, UPDATE_TRAVEL } from '../graphql'
import { pick } from 'lodash-es'
import { ref } from 'vue'
import { useForm } from 'vee-validate';
import { Form, usePageQuery, SearchPlace, Input, FormField, Textarea, Button } from '@trevio/ui'
import { useRoute, useRouter, definePageMeta } from '#imports'

definePageMeta({
  middleware: 'auth'
})

const form = ref({
  place_id: null,
  currency_id: null,
  title: '',
  budget: 0,
  date_start: null,
  date_end: null,
  is_draft: false,
  place: {
    id: null,
    name: ''
  },
  text: '',
  tags: [],
  cover: {}
})

const route = useRoute()
const { setErrors } = useForm()
const isEdit = route.params.travelId > 0
const searchBy = ['countries']
const danger = ref(false)
const loading = ref(false)

const currencies = ref([{
  id: null,
  name: 'Другая валюта',
}])

if (isEdit) {
  const { data } = await usePageQuery({
    query: `
      query($travel_id: ID!) {
        travel(id: $travel_id) {
          ${TRAVEL_FORM}
        }
        currencies {
          id
          name
        }
      }
    `,
    variables: {
      travel_id: route.params.travelId
    }
  })

  data.currencies.forEach((currency) => {
    currencies.value.push(currency)
  })

  Object.assign(form.value, data.travel)
} else {
  const { data } = await usePageQuery({
    query: `
      query {
        currencies {
          id
          name
        }
      }
    `
  })

  data.currencies.forEach((currency) => {
    currencies.value.push(currency)
  })
}

const onSubmit = async () => {
  const input = pick(form.value, [
    'title',
    'currency_id',
    'place_id',
    'budget',
    'text',
    'date_start',
    'date_end',
    'tags',
    'is_draft',
  ])

  input.tags = input.tags.map(tag => tag.id)
  input.images = [form.value.cover.id]

  const {data: { travelForm }} = await usePageQuery({
    query: isEdit ? UPDATE_TRAVEL : CREATE_TRAVEL,
    variables: {
      input,
      id: route.params.travelId
    }
  })

  if (travelForm > 0) {
    await useRouter().push({name: 'travels.show', params: {travelId: travelForm}})
  }
}
</script>