<template>
  <Dialog title="Восстановление пароля">
    <PasswordSendResetLinkForm />
  </Dialog>
</template>

<script setup>
import Dialog from '~/components/_common/Dialog.vue'
import PasswordSendResetLinkForm from './PasswordSendResetLinkForm.vue'
</script>