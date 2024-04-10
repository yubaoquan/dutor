<template>
  <div>
    <v-card class="mx-auto" max-width="700">
      <v-toolbar color="purple" density="compact">
        <v-toolbar-title>
          <v-tooltip :text="hash" location="bottom">
            <template #activator="{ props: prps }">
              <div v-bind="prps">{{ hash.slice(0, 20) }}</div>
            </template>
          </v-tooltip>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          density="comfortable"
          icon="mdi-delete"
          :disabled="!selected.length"
          @click="handleDeleteAllClick"
        ></v-btn>
      </v-toolbar>

      <v-list
        v-for="file in props.files"
        :key="file.id"
        lines="two"
        :selected="selected"
        select-strategy="classic"
        density="compact"
        @click:select="handleFileSelect"
      >
        <v-list-item :value="file.id" density="compact">
          <template #prepend="{ isSelected }">
            <v-list-item-action start>
              <v-checkbox-btn :model-value="isSelected"></v-checkbox-btn>
            </v-list-item-action>
          </template>

          <v-list-item-title>{{ file.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ file.path }}</v-list-item-subtitle>

          <template #append>
            <template v-if="needConfirm === file.id">
              <v-btn
                class="mr-2"
                density="comfortable"
                icon="mdi-check-bold"
                @click.stop="handleDeleteFileConfirm(file)"
              ></v-btn>
              <v-btn
                density="comfortable"
                icon="mdi-close-thick"
                @click.stop="handleDeleteFileCancel(file)"
              ></v-btn>
            </template>
            <v-btn
              v-else
              density="comfortable"
              icon="mdi-delete"
              @click.stop="handleDeleteFileClick(file)"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </div>

  <delete-all-confirm
    :visible="deleteAllAsk"
    @cancel="handleDeleteAllCancel"
    @confirm="handleDeleteAllConfirm"
  ></delete-all-confirm>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, toRaw } from 'vue';
import useDeleteAll from './use-delete-all-confirm';
import type { FileItem } from '../../types/index';

const emit = defineEmits<{
  (e: 'select-file', id: string): void;
  (e: 'unselect-file', id: string): void;
  (e: 'delete-files', ids: string[]): void;
}>();

const props = defineProps<{
  hash: string;
  files: FileItem[];
}>();

const { DeleteAllConfirm, deleteAllAsk, handleDeleteAllCancel, handleDeleteAllClick } =
  useDeleteAll();

const needConfirm = ref(null);
const selected = ref<string[]>([]);
const handleDeleteAllConfirm = () => {
  deleteAllAsk.value = false;

  // ipcRender.invoke 无法传输 Proxy, 所以要使用原始对象
  emit('delete-files', toRaw(selected.value));
};

const handleFileSelect = (file) => {
  const { id, value } = file;
  if (value) {
    selected.value.push(id);
    emit('select-file', id);
  } else {
    selected.value = selected.value.filter((item) => item !== id);
    emit('unselect-file', id);
  }
};

const handleDeleteFileClick = (file) => {
  console.info(`delete file`, file);
  needConfirm.value = file.id;
};

const handleDeleteFileConfirm = async (file) => {
  emit('delete-files', [file.path]);
};

const handleDeleteFileCancel = (file) => {
  console.info(`delete file cancel`, file);
  needConfirm.value = null;
};
</script>

<style lang="less" scoped></style>
