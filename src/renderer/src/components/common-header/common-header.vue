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

    <div class="flex grow-0 justify-end mr-4">
      <v-select
        v-model="locale"
        class="mr-4"
        prepend-inner-icon="mdi-translate"
        hide-details
        :items="languages"
        density="compact"
        :label="$t('common.language')"
      ></v-select>

      <v-switch
        :model-value="isDark"
        false-icon="mdi-white-balance-sunny"
        true-icon="mdi-moon-waning-crescent"
        hide-details
        density="compact"
        @update:model-value="handleThemeChange"
      ></v-switch>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useDark, useToggle } from '@vueuse/core';
import { useThemeStore } from '@renderer/stores/theme';

const { setTheme } = useThemeStore();

const isDark = useDark();
const toggleDark = useToggle(isDark);

const route = useRoute();
const { locale, t } = useI18n({ useScope: 'global' });

const breadscrumbPieces = computed(() =>
  route.matched
    .filter((item) => !!item.meta?.title)
    .map((item) => {
      const metaTitle = item.meta.title as string;
      return {
        title: metaTitle ? t(metaTitle) : item.path,
        disabled: route.path === item.path,
        to: item.path,
      };
    }),
);

const languages = ref<any[]>([
  { title: '中文', value: 'cn', props: { density: 'compact' } },
  { title: 'English', value: 'en', props: { density: 'compact' } },
]);

onMounted(async () => {
  const isDarkFromMain = await window.api.getIsDark();
  setTheme(isDarkFromMain);
});

const handleThemeChange = () => {
  setTheme(!isDark.value);
  toggleDark();
  window.api.toggleTheme();
};
</script>

<style lang="less" scoped></style>
