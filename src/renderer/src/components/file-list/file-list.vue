<template>
  <div>
    <v-card class="mx-auto" max-width="700">
      <v-toolbar color="purple" density="compact">
        <v-checkbox-btn
          v-model="allSelected"
          @update:model-value="handleSelectAll"
        ></v-checkbox-btn>

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
        v-for="file in files"
        :key="file.path"
        lines="two"
        :selected="selected"
        select-strategy="classic"
        density="compact"
        @click:select="handleFileSelect"
      >
        <v-list-item :value="file.path" density="compact">
          <template #prepend="{ isSelected }">
            <v-list-item-action start>
              <v-checkbox-btn :model-value="isSelected"></v-checkbox-btn>
            </v-list-item-action>
          </template>

          <v-list-item-title>{{ file.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ file.path }}</v-list-item-subtitle>

          <template #append>
            <v-btn
              class="mr-2"
              density="comfortable"
              icon="mdi-folder"
              @click.stop="handleOpenFolderClick(file)"
            ></v-btn>
            <template v-if="needConfirm === file.path">
              <v-btn
                class="mr-2"
                density="comfortable"
                icon="mdi-check-bold"
                @click.stop="handleDeleteFileConfirm(file)"
              ></v-btn>
              <v-btn
                density="comfortable"
                icon="mdi-close-thick"
                @click.stop="handleDeleteFileCancel"
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

    <delete-all-confirm
      :visible="deleteAllAsk"
      @cancel="handleDeleteAllCancel"
      @confirm="handleDeleteAllConfirm"
    ></delete-all-confirm>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, toRaw } from 'vue';
import useDeleteAll from './use-delete-all-confirm';
import type { FileItem } from '../../types/index';

enum EventType {
  SELECT_FILES = 'select-files',
  UNSELECT_FILES = 'unselect-files',
  DELETE_FILES = 'delete-files',
}

const emit = defineEmits<{
  (e: EventType.SELECT_FILES, ids: string[]): void;
  (e: EventType.UNSELECT_FILES, ids: string[]): void;
  (e: EventType.DELETE_FILES, ids: string[]): void;
}>();

const props = defineProps<{
  hash: string;
  files: FileItem[];
}>();

const { DeleteAllConfirm, deleteAllAsk, handleDeleteAllCancel, handleDeleteAllClick } =
  useDeleteAll();

const needConfirm = ref('');
const selected = ref<string[]>([]);
const allSelected = ref(false);
const handleDeleteAllConfirm = () => {
  deleteAllAsk.value = false;

  // ipcRender.invoke 无法传输 Proxy, 所以要使用原始对象
  emit(EventType.DELETE_FILES, toRaw(selected.value));
};

const handleFileSelect = (file) => {
  const { id, value } = file;
  if (value) {
    selected.value.push(id);
    emit(EventType.SELECT_FILES, [id]);
  } else {
    selected.value = selected.value.filter((item) => item !== id);
    emit(EventType.UNSELECT_FILES, [id]);
  }

  allSelected.value = selected.value.length === props.files.length;
};

const handleOpenFolderClick = (file: FileItem) => {
  window.api.openFolder(file.path);
};

const handleDeleteFileClick = (file: FileItem) => {
  needConfirm.value = file.path;
};

const handleDeleteFileConfirm = async (file: FileItem) => {
  emit(EventType.DELETE_FILES, [file.path]);
};

const handleDeleteFileCancel = () => {
  needConfirm.value = '';
};

const handleSelectAll = (value: boolean) => {
  if (value) {
    selected.value = props.files.map((file) => file.path);
    emit(EventType.SELECT_FILES, selected.value);
  } else {
    selected.value = [];
    emit(EventType.UNSELECT_FILES, selected.value);
  }
};
</script>

<style lang="less" scoped></style>
