<template>
  <div class="divide-y">
    <div v-for="operation in operations" :key="operation.id" class="flex items-center space-x-2 cursor-default py-4 hover:bg-gray-50">
      <div class="flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-full w-8 h-8 font-semibold text-gray-400">
        <RussianRuble
          class="w-4 h-4"
          :class="{
              [operation.type === 'increment' && operation.confirmed_at ? 'text-green-400' : 'text-gray-400']: true,
              'text-red-400': !operation.confirmed_at
            }">
        </RussianRuble>
      </div>

      <div class="flex-auto">
        <div class="text-xs">
          #{{ operation.id }} / {{ !operation.confirmed_at ? 'Не подтверждено' : `Подтверждено ${format(parseISO(operation.confirmed_at), 'dd.MM.yyyy в HH:mm')}` }}
        </div>
        <div v-if="operation.message" class="font-semibold text-sm mb-0.5" :class="{
              [operation.type === 'increment' && operation.confirmed_at ? 'text-green-400' : 'text-gray-400']: true,
              'text-red-400': !operation.confirmed_at
            }">
          {{ operation.message }}
        </div>
      </div>

      <div class="text-xl" :class="{
              [operation.type === 'increment' && operation.confirmed_at ? 'text-green-400' : 'text-gray-400']: true,
              'text-red-400': !operation.confirmed_at
            }">
        {{ operation.type === 'increment' ? '+' : '-'}}{{ operation.amount }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { RussianRuble } from 'lucide-vue-next'
import { format, parseISO } from 'date-fns'

defineProps({
  operations: {
    type: Array
  }
})
</script>
