<template>
  <NuxtLayout heading="Контактные ссылки">
    <UserEditNav class="mb-4" />

    <Form :submit="onSubmit" v-slot="{ isLoading }">
      <FormField class="mb-2" name="url" v-slot="{ hasError }">
        <Input v-model="url" type="url" placeholder="Вставьте ссылку" :has-error="hasError" />
      </FormField>

      <Button :loading="isLoading" type="submit">Добавить</Button>
    </Form>

    <div v-if="links.length" class="mt-6">
      <hr class="mb-6">
      <div class="space-y-4">
        <UserContactLinkCard
            v-for="(link, index) in links"
            :key="link.id"
            :link="link"
            @deleted="links.splice(index, 1)" />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import UserContactLinkCard from '~/components/users/components/UserContactLinkCard.vue'
import UserEditNav from '~/components/users/components/UserEditNav.vue'
import { Button, useQuery, usePageQuery, Input, Form, FormField } from '@trevio/ui'
import { LINK } from '~/components/links/graphql'
import { definePageMeta } from '#imports'
import { shallowRef } from 'vue'
import { useAuth } from '#auth/runtime/composables'

definePageMeta({
  middleware: 'auth'
})

const userId = useAuth().user.id
const url = shallowRef('')
const links = shallowRef([])

try {
  const { data } = await usePageQuery({
    query: `
      query getContactLinks($user_id: ID!) {
        contactLinks(user_id: $user_id) {
          ${LINK}
        }
      }
    `,
    variables: {
      user_id: userId
    }
  })

  links.value = data.contactLinks
} catch (errors) {}

const onSubmit = async () => {
  const { data } = await useQuery({
    query: `
      mutation createContactLink($url: String) {
        link: createContactLink(url: $url) {
          ${LINK}
        }
      }
    `,
    variables: {
      url: url.value
    }
  })

  links.value.unshift(data.link)

  url.value = ''
}
</script>