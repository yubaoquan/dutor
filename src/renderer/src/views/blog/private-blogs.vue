<template>
  <div>私密博客列表</div>
  <div>用户ID：{{ route.params.userId }}</div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<style lang="less" scoped></style>
