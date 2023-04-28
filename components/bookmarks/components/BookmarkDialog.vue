<template>
  <Dialog title="Категории закладок">
    <div v-if="store.categories.length" class="space-y-1">
      <div v-for="category in store.categories" :key="category.id" class="flex items-center justify-between">
        <label :for="`category-${category.id}`" class="space-x-1 mr-2">
          <input type="checkbox" :id="`category-${category.id}`" :value="category.id" v-model="categories" />
          <span>{{ category.name }}</span>
        </label>
        <div class="flex items-center space-x-3">
          <Lock v-if="category.is_private" class="w-4 h-4" />
          <button type="button" @click="onEdit(category)">
            <Pencil class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
    <div v-else>У вас нет категорий для закладок</div>
    <footer class="flex items-center space-x-2 mt-4">
      <Button @click="onSubmit">Сохранить</Button>
      <Button variant="secondary" @click="overlay.show(BookmarksCategoryForm)">Создать категорию</Button>
    </footer>
  </Dialog>
</template>

<script setup>
import BookmarksCategoryForm from './BookmarkCategoryFormDialog'
import Dialog from '~/components/_common/Dialog.vue'
import { Pencil } from 'lucide-vue-next'
import { ref } from 'vue'
import { useBookmarksStore, useOverlay, usePageQuery, Button } from '@trevio/ui'
import { Lock } from 'lucide-vue-next'

const overlay = useOverlay()

const emit = defineEmits([
    'change'
])
const props = defineProps({
  modelType: {
    type: String,
    required: true,
  },
  modelId: {
    type: [Number, String],
    required: true,
  },
  modelValue: {
    type: Array,
    required: true,
  }
})

const store = useBookmarksStore()
const loading = ref(false)
const categories = ref(props.modelValue)

const onEdit = (category) => {
  overlay.show(BookmarksCategoryForm, {
    props: {
      category
    }
  })
}

const onSubmit = async () => {
  if (loading.value) {
    return
  }

  loading.value = true

  try {
    const { data } = await usePageQuery({
      query: `
        mutation ($model_type: String!, $model_id: ID!, $categories: [ID!]!) {
          createDeleteBookmark(model_type: $model_type, model_id: $model_id, categories: $categories) {
            insert
            delete
          }
        }
      `,
      variables: {
        model_type:  props.modelType,
        model_id:    props.modelId,
        categories:  categories.value,
      }
    })

    if (data.createDeleteBookmark.insert.length > 0) {
      store.incrementBookmarksCount(data.createDeleteBookmark.insert)
    }

    if (data.createDeleteBookmark.delete.length > 0) {
      store.decrementBookmarksCount(data.createDeleteBookmark.delete)
    }

    emit('change', categories.value)
  } catch (error) {}
  finally {
    loading.value = false
  }
}
</script>