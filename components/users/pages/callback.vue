<template>
  <div>{{ error }}</div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useFetch, useRoute } from '#imports'

const route = useRoute()
const error = ref(null)

try {
  const { data } = await useFetch(`http://127.0.0.1:9000/api/users/oauth/${route.params.provider}/callback`, {
    query: {
      code: route.query.code
    }
  })

  onMounted(() => {
    opener.setToken(data.value?.token)
    window.close()
  })
} catch (error) {
  error.value = error
}
</script>