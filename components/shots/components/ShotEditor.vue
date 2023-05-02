<template>
  <div class="flex flex-col items-end justify-end h-full w-full">
    <button class="bg-black/50 rounded-lg fixed top-4 right-4 w-8 h-8 z-10" type="button" @click="overlay.hide">
      <X class="text-white mx-auto w-5 h-5"/>
    </button>

    <div class="fixed top-0 left-0 right-0 bottom-0">
      <canvas id="shot"></canvas>
    </div>

    <ShotEditorTrashButton v-if="shotEditorStore.isTrash" id="trash" class="z-10 mx-auto mb-4"
                           @mouseup="trashAdd"></ShotEditorTrashButton>
    <ShotEditorImageButton v-else @click="addImage" class="z-10 mx-auto mb-4"></ShotEditorImageButton>

    <footer class="relative z-10 p-2 w-full">
      <div class="bg-gray-50 w-full flex items-center rounded-lg">
        <ShotEditorBackground class="w-[70%]"/>

        <div class="border-l -ml-[1px] p-2 flex space-x-2">
          <Button @click="showPanel = !showPanel" variant="secondary">
            <Sliders class="w-5 h-5"/>
          </Button>
          <Button :loading="isLoading" class="flex-auto" @click="onSubmit(onSubmitCallback, form.isTravel)">Создать
          </Button>
        </div>
      </div>
    </footer>

    <section v-show="showPanel" ref="panel" class="fixed w-full h-full z-10">
      <div class="absolute w-full h-full top-0 left-0 bg-black/70" @click="showPanel = !showPanel"></div>
      <div class="w-[80%] ml-auto flex flex-col h-full bg-gray-100/80 backdrop-blur-sm overflow-hidden">
        <ul class="flex items-center cursor-pointer bg-slate-200 text-center font-medium text-sm border-b border-slate-200">
          <li @click="activeTab = 'text'" class="p-4 flex-1" :class="{'bg-slate-300': activeTab === 'text'}">Текст</li>
          <li @click="activeTab = 'brushes'" class="p-4 flex-1" :class="{'bg-slate-300': activeTab === 'brushes'}">
            Кисти
          </li>
          <li @click="showPanel = false" class="p-4 flex-1">
            Закрыть
          </li>
        </ul>

        <div class="flex-auto flex flex-col">
          <ShotEditorTextPanel v-show="activeTab === 'text'"/>
          <ShotEditorPanelBrushes v-show="activeTab === 'brushes'"/>

          <label v-if="lastUserTravel" for="last-travel" class="mt-auto text-sm p-4 ">
            <input type="checkbox" v-model="form.isTravel" id="last-travel">
            Прикрепить к путешествию "<span class="font-medium">{{ lastUserTravel.title }}</span>"
          </label>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import ShotEditorBackground from '~/components/shots/components/ShotEditorBackground.vue'
import ShotEditorImageButton from '~/components/shots/components/ShotEditorImageButton.vue'
import ShotEditorTextPanel from '~/components/shots/components/ShotEditorTextPanel.vue'
import ShotEditorTrashButton from '~/components/shots/components/ShotEditorTrashButton.vue'
import ShotEditorPanelBrushes from '~/components/shots/components/ShotEditorPanelBrushes.vue'
import { ref, shallowRef } from 'vue'
import { useShotsStore, useOverlay, Button, useShotEditor, usePageQuery } from '@trevio/ui'
import { X, Sliders } from 'lucide-vue-next'

const overlay = useOverlay()

const {
  createShotEditor,
  trashAdd,
  shotEditorStore,
  onSubmit,
  isLoading,
  addImage,
} = useShotEditor()

const colors = ['white', 'black', 'red', 'green', 'yellow', 'orange']

const activeTab = shallowRef('text')
const lastUserTravel = ref(null)

const panel = ref(null)
const showPanel = shallowRef(false)

const form = ref({
  isTravel: false,
})

const onSubmitCallback = ({ createShot }) => {
  useShotsStore().updateStory(createShot)
  overlay.hide()
}

createShotEditor({
  width: document.body.clientWidth,
  height: window.innerHeight,
})

try {
  const { data } = await usePageQuery({
    query: `
      query($userId: ID) {
        lastUserTravel: travels(userId: $userId, limit: 1) {
          id
          title
        }
      }
    `,
  })

  if (data.lastUserTravel.length) {
    lastUserTravel.value = data.lastUserTravel[0]
  }
} catch (error) {
}
</script>