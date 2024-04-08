<template>
  <v-dialog
    :model-value="props.visible"
    max-width="400"
    persistent
    transition="dialog-top-transition"
  >
    <v-card prepend-icon="mdi-help-circle" text="将删除全部勾选的文件" title="确定删除吗?">
      <template #actions>
        <v-spacer></v-spacer>

        <v-btn variant="tonal" @click="handleCancelClick">取消</v-btn>
        <v-btn variant="flat" color="#5865f2" @click="handleConfirmClick">确定</v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{
  (e: 'cancel'): void;
  (e: 'confirm'): void;
}>();

const handleCancelClick = () => {
  console.info(`cancel`);

  emit('cancel');
};

const handleConfirmClick = () => {
  console.info(`confirm`);

  emit('confirm');
};
</script>

<style lang="less" scoped></style>
