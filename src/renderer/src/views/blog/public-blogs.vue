<template>
  <div>
    <router-link to="/blog/create?public=1" class="pa-4"
      ><v-btn class="inline-block" :text="$t('blog.createBlog')" variant="tonal"></v-btn
    ></router-link>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

onMounted(async () => {
  const blogs = await window.api.blog.getBlogs(
    { isPublic: true, tags: ['p-a1', 'p-a', 'ccc'] },

    // { isPublic: true },
    { page: 1, pageSize: 100 },
  );
  console.info(blogs);
});
</script>

<style lang="less" scoped></style>
