<template>
  <div class="fixed top-0 right-0 left-0 bottom-0 bg-black/50 z-10 h-full flex justify-end" @click="onClickOutside" id="user-panel">
    <div class="w-[80%] bg-white p-4">
      <div class="mb-3">
        <NuxtLink :to="{name: 'users.show', params: {userId: $auth.user.id}}" class="p-4 bg-sky-50 flex items-center rounded-t-lg hover:bg-sky-100">
          <img :src="$auth.user.avatar" :alt="$auth.user.name" class="w-11 h-11 rounded-full" />
          <div class="ml-2 overflow-hidden">
            <div class="text-xs text-gray-400">Перейти в профиль</div>
            <div class="text-sm font-medium truncate">{{ $auth.user.name }}</div>
          </div>
        </NuxtLink>
        <div class="flex items-center mt-1">
          <NuxtLink :to="{name: 'wallets.show'}" class="flex-shrink-0 p-4 bg-gray-100 rounded-bl-lg">
            <div class="text-xs text-gray-400">Мой кошелек</div>
            <div class="text-sm font-medium truncate">{{ $auth.user.wallet?.balance || 0 }} монет</div>
          </NuxtLink>
          <NuxtLink
            :to="{name: 'users.premium'}"
            class="flex-auto flex-shrink-0 p-4 bg-gray-100 rounded-br-lg ml-1"
            :class="{[$auth.user.premium?.ends_at ? 'bg-green-100' : 'bg-gray-100']: true}"
          >
            <div class="text-xs text-gray-400">Премиум</div>
            <div class="text-sm font-medium truncate">
              {{ $auth.user.premium?.ends_at ? `До ${$auth.user.premium.ends_at}` : 'Не активирован' }}
            </div>
          </NuxtLink>
        </div>
      </div>
      <ul class="space-y-1">
        <li>
          <NuxtLink :to="{name: 'users.edit'}" class="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            <div class="flex-shrink-0 p-2 rounded-lg bg-white"><Edit class="w-4 h-4" /></div>
            <span>Редактировать</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{name: 'subscriptions'}" class="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            <div class="flex-shrink-0 p-2 rounded-lg bg-white"><Users class="w-4 h-4" /></div>
            <div>Подписки</div>
          </NuxtLink>
        </li>
        <li>
          <button @click="$auth.logout()" class="flex items-center space-x-2 bg-amber-100 rounded-lg p-1 w-full">
            <span class="flex-shrink-0 p-2 rounded-lg bg-white"><LogOut class="w-4 h-4" /></span>
            <span>Выход</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { Users, LogOut, Edit } from 'lucide-vue-next'
const emit = defineEmits(['update:userPanel'])

defineProps({
  userPanel: Boolean
})

const onClickOutside = ({ target }) => {
  if (target.id === 'user-panel') {
    emit('update:userPanel', false)
  }
}
</script>