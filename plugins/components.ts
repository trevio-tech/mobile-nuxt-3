import { defineNuxtPlugin } from '#imports'
import { Button, Like, IsLoggedIn, RippleDirective, OverlayPlugin } from '@trevio/ui'

export default defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.vueApp.component('Like', Like)
  nuxtApp.vueApp.component('IsLoggedIn', IsLoggedIn)
  nuxtApp.vueApp.directive('ripple', RippleDirective)
  nuxtApp.vueApp.use(OverlayPlugin)
})