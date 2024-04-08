<template>
  <v-container class="bg-surface-variant">
    <v-snackbar v-model="showMessage" location="top" :timeout="2000" rounded>
      {{ toastMessage }}

      <template #actions>
        <v-btn color="pink" variant="text" @click="showMessage = false"> Close </v-btn>
      </template>
    </v-snackbar>

    <v-row no-gutters>
      <v-col cols="12" sm="4">
        <v-sheet class="ma-2 pa-2">
          <folder-select @select="handleFolderSelect"></folder-select>
          <div class="mt-4 text-right">
            <v-btn
              color="primary"
              :loading="isLoading"
              :disabled="!targetFolder"
              @click="handleScanClick"
              >开始扫描</v-btn
            >
          </div>
        </v-sheet>
      </v-col>
      <v-col cols="12" sm="8">
        <div class="text-right pr-2">
          <v-btn color="red" :disabled="!selectedFileIds.length" @click="handleDeleteAllClick"
            >删除全部勾选项</v-btn
          >
        </div>
        <v-sheet class="ma-2 pa-2">
          <file-list
            v-for="filesGroup in filesGroups"
            :key="filesGroup.hash"
            :hash="filesGroup.hash"
            :files="filesGroup.files"
            @select-file="handleFileSelect"
            @unselect-file="handleFileUnselect"
            @file-deleted="handleFileDeleted"
          ></file-list>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, provide } from 'vue';
import FileList from '@/components/file-list/file-list.vue';
import FolderSelect from '@/components/folder-select/folder-select.vue';

const targetFolder = ref<string>('');
const isLoading = ref(false);
const showMessage = ref(false);
const toastMessage = ref<string>('');

type HashItem = {
  hash: string;
  files: {
    id: string;
    name: string;
    path: string;
  }[];
};
const filesGroups = ref<HashItem[]>([]);
const selectedFileIds = ref<string[]>([]);

const toast = (msg: string) => {
  toastMessage.value = msg;
  showMessage.value = true;
};

provide('toast', toast);

const handleScanClick = async () => {
  isLoading.value = true;
  const result = await window.api.scanDuplicatedFiles(targetFolder.value);
  console.info('scan result', result);

  isLoading.value = false;
  filesGroups.value = Object.entries(result)
    .filter(([, files]) => files.length > 1)
    .map(([hash, files]) => ({
      hash,
      files: files.map((file) => ({
        id: file.path,
        name: file.name,
        path: file.path,
      })),
    }));

  selectedFileIds.value = [];

  if (filesGroups.value.length === 0) {
    toast('没有发现重复文件');
  }
};

const handleDeleteAllClick = () => {
  console.info(`delete all files`);
};

const handleFolderSelect = (v) => {
  targetFolder.value = v;
};

const handleFileSelect = (id: string) => {
  if (!selectedFileIds.value.includes(id)) {
    selectedFileIds.value.push(id);
  }
};

const handleFileUnselect = (id: string) => {
  if (selectedFileIds.value.includes(id)) {
    selectedFileIds.value = selectedFileIds.value.filter((item) => item !== id);
  }
};

const handleFileDeleted = (id: string) => {
  selectedFileIds.value = selectedFileIds.value.filter((item) => item !== id);
  filesGroups.value.forEach((group) => {
    group.files = group.files.filter((file) => file.id !== id);
  });
};
</script>

<style lang="less" scoped></style>
