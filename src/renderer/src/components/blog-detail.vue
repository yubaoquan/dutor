<template>
  <div class="enhance-html blog-detail">
    <div class="blog-title text-xl">{{ title }}</div>
    <div class="blog-tags my-4">
      <v-chip v-for="tag in tags" :key="tag" variant="elevated" size="small" class="mr-2">{{
        tag
      }}</v-chip>
    </div>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="blog-content" v-html="content"></div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

defineProps<{
  content: string;
  tags: string[];
  title: string;
}>();
</script>

<style lang="less" scoped>
.blog-detail {
  min-height: 500px;
}
</style>
