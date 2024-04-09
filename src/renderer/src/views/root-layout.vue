<template>
  <v-breadcrumbs :items="breadscrumbPieces">
    <template #divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
    <template #item="{ item }">
      <v-breadcrumbs-item
        v-bind="item"
        tag="span"
        :title="item.title"
        :to="item.to"
      ></v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { MainMessage } from '../../../common/message';

const route = useRoute();

type BreadcrumbPiece = {
  title: string;
  disabled: boolean;
  to: string;
};

const breadscrumbPieces = ref<BreadcrumbPiece[]>([]);

const initBreadcrumbs = () => {
  breadscrumbPieces.value = route.matched
    .filter((item) => !!item.meta?.title)
    .map((item) => ({
      title: (item.meta.title as string) || item.path,
      disabled: route.path === item.path,
      to: item.path,
    }));
};

watch(
  () => route.path,
  () => {
    initBreadcrumbs();
  },
);

onMounted(() => {
  initBreadcrumbs();
});

window.api.listenFromMain(MainMessage.BeforeHash, (path) => {
  console.info(`before hash of file`, path);
});

window.api.listenFromMain(MainMessage.AfterHash, (path, hash) => {
  console.info(` hash of file ${path} is ${hash}`);
});
</script>

<style lang="less" scoped></style>
