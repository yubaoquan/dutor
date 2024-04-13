<template>
  <div class="index-page">
    <div class="text-3xl font-bold underline">欢迎使用</div>
    <v-container>
      <v-row align="center" justify="center">
        <v-col v-for="(item, i) in features" :key="i" cols="auto">
          <v-card variant="tonal" class="mx-auto" max-width="344" min-width="300">
            <v-card-item>
              <div>
                <div class="text-overline mb-1">
                  {{ item.title }}
                </div>
                <div class="text-h6 mb-1">{{ item.headline }}</div>
                <div class="text-caption">{{ item.caption }}</div>
              </div>
            </v-card-item>

            <v-card-actions>
              <v-btn @click="handleItemClick(item)">使用</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const features = [
  {
    title: '文件查重',
    headline: '文件查重',
    caption: '管理文件夹中内容重复的文件',
    path: '/dutor',
  },
  { title: 'about', headline: 'about', caption: 'building', path: '/about' },
];

const handleItemClick = (item) => {
  router.push(item.path);
};
</script>

<style lang="less" scoped>
.index-page {
  padding: 20px;
  text-align: center;
}
</style>
