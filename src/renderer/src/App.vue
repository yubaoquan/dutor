<template>
  <v-theme-provider :theme="themeStore.themeName">
    <router-view></router-view>

    <v-container class="fixed bottom-0">
      <v-row align="center" justify="center">
        <v-col cols="auto">
          <v-btn size="x-small" @click="handleDebugClick">Debug</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-theme-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useThemeStore } from '@renderer/stores/theme';

const themeStore = useThemeStore();
const devOpened = ref(false);
const handleDebugClick = () => {
  window.api.openDevTools(!devOpened.value);
  devOpened.value = !devOpened.value;
};
</script>
