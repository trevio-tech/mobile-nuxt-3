<template>
  <div class="p-4 w-full">
    <div class="bg-white rounded-lg shadow-md">
      <header class="p-4 flex justify-between items-center p-4 rounded-t border-b border-slate-200">
        <h3 class="text-xl font-semibold text-slate-900 mr-4 truncate">
          {{ title }}
        </h3>
        <button @click="overlay.hide" type="button" class="text-slate-400 bg-transparent hover:bg-slate-200 hover:text-slate-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
          <X class="w-5 h-5" />
          <span class="sr-only">Закрыть</span>
        </button>
      </header>
      <div class="p-4 flex-auto">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { X } from 'lucide-vue-next'
import { useOverlay } from '@trevio/ui'

const overlay = useOverlay()

defineProps({
  title: {
    type: String
  },
  fullHeight: {
    type: Boolean
  }
})

</script>