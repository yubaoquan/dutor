<template>
  <v-btn ref="trigger" density="compact" icon="mdi-filter"> </v-btn>
  <v-dialog :activator="trigger" max-width="740">
    <template #default="{ isActive }">
      <v-card prepend-icon="mdi-filter" :title="$t('dutor.setFilterConditions')">
        <v-divider></v-divider>
        <v-card-text class="px-4"> building... </v-card-text>
        <v-card-actions>
          <v-btn :text="$t('common.cancel')" @click="isActive.value = false"></v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="surface-variant"
            :text="$t('common.confirm')"
            variant="flat"
            @click="handleConfirm(isActive)"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { ref } from 'vue';

const trigger = ref<any>(null);

const handleConfirm = (isActive: Ref<boolean>) => {
  console.log('handleConfirm', isActive.value);
  isActive.value = false;
};
</script>

<style lang="less" scoped></style>
