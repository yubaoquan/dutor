<template>
  <div class="index-page">
    <div class="text-3xl font-bold underline">{{ $t('common.welcome') }}</div>
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
              <v-btn @click="handleItemClick(item)">{{ $t('common.use') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t } = useI18n({ useScope: 'global' });

const router = useRouter();
const features = computed(() => [
  {
    title: t('route.dutor'),
    headline: t('route.dutor'),
    caption: t('dutor.pageDescription'),
    path: '/dutor',
  },
  {
    title: t('route.about'),
    headline: t('route.about'),
    caption: t('common.building'),
    path: '/about',
  },
]);

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
