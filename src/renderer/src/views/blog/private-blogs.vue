<template>
  <div>私密博客列表</div>
  <div>用户ID：{{ route.params.userId }}</div>
  <div>
    <router-link to="/blog/create?public=0" class="pa-4"
      ><v-btn class="inline-block" :text="$t('blog.createBlog')" variant="tonal"></v-btn
    ></router-link>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

onMounted(async () => {
  const blogs = await window.api.blog.getBlogs({ author: route.params.userId });
  console.info(blogs);
});
</script>

<style lang="less" scoped></style>
