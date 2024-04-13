<template>
  <div class="flex justify-between items-center">
    <v-breadcrumbs :items="breadscrumbPieces" class="flex-1" density="compact">
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

    <v-select
      v-model="locale"
      prepend-inner-icon="mdi-translate"
      hide-details
      class="grow-0 custom-select"
      :items="languages"
      density="compact"
      :label="$t('common.language')"
    ></v-select>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

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
  () => initBreadcrumbs(),
);

onMounted(() => initBreadcrumbs());

const languages = ref<any[]>([
  { title: '中文', value: 'cn' },
  { title: 'English', value: 'en' },
]);

const { locale } = useI18n({ useScope: 'global' });
</script>

<style lang="less" scoped></style>
