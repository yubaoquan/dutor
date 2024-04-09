<template>
  <router-view></router-view>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-btn size="x-small" @click="handleDebugClick">Debug</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const devOpened = ref(false);
const handleDebugClick = () => {
  window.api.openDevTools(!devOpened.value);
  devOpened.value = !devOpened.value;
};
</script>
