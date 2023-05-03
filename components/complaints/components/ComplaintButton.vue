<template>
  <button type="button" @click="onClick" class="p-1 text-sm flex items-center rounded-lg bg-red-50 text-red-300 flex items-center space-x-1 font-medium">
    <AlertCircle class="w-5 h-5" />
  </button>
</template>

<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next'
import { defineAsyncComponent } from 'vue'
import { useOverlay } from '@trevio/ui'

const overlay = useOverlay()

const props = defineProps<{
  modelType: string
  modelId:   string|number
}>()

const onClick = async () => {
  overlay.show(defineAsyncComponent(() => import('~/components/complaints/components/ComplaintDialog.vue')), {
    props,
    on: {
      success: overlay.hide,
    },
  })
}
</script>