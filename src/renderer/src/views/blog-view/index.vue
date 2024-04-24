<template>
  <div>
    <div class="text-center">博客系统</div>
    <div v-if="route.path === '/blog'">
      <div>
        <router-link to="/blog/common">公共博客列表</router-link>
      </div>
      <div>
        <router-link to="/blog/login">登入私密账户</router-link>
      </div>
      <div>
        <router-link to="/blog/register">注册私密账户</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<style lang="less" scoped></style>
