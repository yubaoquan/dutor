<template>
  <div v-if="!isHomePage" class="action">
    <a target="_blank" rel="noreferrer" @click="handleHomeClick">Home</a>
  </div>
  <RouterView />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const isHomePage = computed(() => route.path === '/');
const handleHomeClick = async () => {
  router.push('/');
};
</script>
