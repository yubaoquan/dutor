

<template>
  <RouterView />
    <div class="action">
      <a target="_blank" rel="noreferrer" @click="ipcHandle">Send IPC</a>
    </div>
</template>

<script setup lang="ts">
import Versions from './components/Versions.vue'

const ipcHandle = async () => {
  const res = await window.api.ping('ping')
  console.info('res', res)
}
</script>
