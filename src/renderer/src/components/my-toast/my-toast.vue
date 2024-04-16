<template>
  <v-snackbar v-model="isVisible" location="top" :timeout="2000" rounded>
    {{ message }}

    <template #actions>
      <v-btn color="pink" variant="text" @click="isVisible = false">{{ $t('common.close') }}</v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts" setup>
import { ref, defineExpose } from 'vue';

const isVisible = ref(false);
const message = ref('');

const toast = (msg: string) => {
  message.value = msg;
  isVisible.value = true;
};

defineExpose({ toast });
</script>

<style lang="less" scoped></style>
