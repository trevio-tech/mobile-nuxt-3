<template>
  <div class="grid grid-cols-4 gap-2">
    <div v-for="(image, index) in modelValue" class="cursor-move select-none relative rounded-lg overflow-hidden aspect-square">
      <img :src="image.url.default" alt="" class="w-full h-full object-cover block">

      <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center space-x-1 bg-black bg-opacity-25 text-white">
        <div class="p-1 bg-gray-400/80 rounded-full cursor-pointer">
          <Pencil class="w-4 h-4" />
        </div>
        <div @click="onDelete(index)" class="p-1 bg-red-400/80 rounded-full bg-gray cursor-pointer">
          <Trash class="w-4 h-4" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Pencil, Trash } from 'lucide-vue-next'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type:     Array,
    required: true,
  }
})

const onDelete = async (index) => {
  props.modelValue.splice(index, 1)
  emit('update:modelValue', props.modelValue)
}
</script>