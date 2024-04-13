<template>
  <v-container class="bg-surface-variant" fluid>
    <v-snackbar v-model="showMessage" location="top" :timeout="2000" rounded>
      {{ toastMessage }}

      <template #actions>
        <v-btn color="pink" variant="text" @click="showMessage = false"> Close </v-btn>
      </template>
    </v-snackbar>

    <template v-if="isScanning">
      <scan-progress
        :all-files="allFiles"
        :scanning-files="scanningFiles"
        :finished-files="finishedFiles"
      ></scan-progress>
    </template>
    <template v-else>
      <v-row>
        <v-col cols="2">
          <v-btn color="#66BB6A" @click="handleSelectFolderClick">选择文件夹</v-btn>
        </v-col>
        <v-col cols="8">{{ targetFolder }}</v-col>
        <v-col cols="2" class="text-right">
          <v-btn
            color="primary"
            :loading="isScanning"
            :disabled="!targetFolder"
            @click="handleScanClick"
            >开始扫描</v-btn
          >
        </v-col>
      </v-row>

      <v-row v-if="filesGroups.length">
        <v-col>
          <div v-if="selectedFileIds.length" class="text-right pr-2">
            <v-btn color="red" @click="handleDeleteAllClick">删除全部勾选项</v-btn>
          </div>
          <v-sheet class="ma-2 pa-2">
            <file-list
              v-for="filesGroup in filesGroups"
              :key="filesGroup.hash"
              :hash="filesGroup.hash"
              :files="filesGroup.files"
              @select-files="handleFileSelect"
              @unselect-files="handleFileUnselect"
              @delete-files="handleDeleteFiles"
            ></file-list>
          </v-sheet>
        </v-col>
      </v-row>
    </template>
  </v-container>

  <delete-all-confirm
    :visible="deleteAllAsk"
    @cancel="handleDeleteAllCancel"
    @confirm="handleDeleteAllConfirm"
  ></delete-all-confirm>
</template>

<script lang="ts" setup>
import { ref, provide, toRaw } from 'vue';
import useDeleteAll from '@renderer/components/file-list/use-delete-all-confirm';
import ScanProgress from '@renderer/components/scan-progress/scan-progress.vue';
import FileList from '@/components/file-list/file-list.vue';
import { MainMessage } from '../../../common/message';
import type { FileItem } from '../types/index';
import useScanProgress from '../components/scan-progress/use-progress';

type HashItem = {
  hash: string;
  files: FileItem[];
};

const { allFiles, scanningFiles, finishedFiles, resetProgress, initProgress, updateProgress } =
  useScanProgress();
const targetFolder = ref<string>('');
const isScanning = ref(false);
const showMessage = ref(false);
const toastMessage = ref<string>('');

const filesGroups = ref<HashItem[]>([]);
const selectedFileIds = ref<string[]>([]);

const { DeleteAllConfirm, deleteAllAsk, handleDeleteAllCancel, handleDeleteAllClick } =
  useDeleteAll();

const toast = (msg: string) => {
  toastMessage.value = msg;
  showMessage.value = true;
};

provide('toast', toast);

const handleScanClick = async () => {
  isScanning.value = true;
  resetProgress();
  const result = await window.api.scanDuplicatedFiles(targetFolder.value);
  console.info('scan result', result);

  isScanning.value = false;
  filesGroups.value = Object.entries(result)
    .filter(([, files]) => files.length > 1)
    .map(([hash, files]) => ({
      hash,
      files: files.map((file) => ({
        name: file.name,
        path: file.path,
      })),
    }));

  selectedFileIds.value = [];

  if (filesGroups.value.length === 0) {
    toast('没有发现重复文件');
  }
};

const handleFileSelect = (ids: string[]) => {
  ids.forEach((id) => {
    if (!selectedFileIds.value.includes(id)) {
      selectedFileIds.value.push(id);
    }
  });
};

const handleFileUnselect = (ids: string[]) => {
  const toUnselect = ids.filter((id) => selectedFileIds.value.includes(id));
  selectedFileIds.value = selectedFileIds.value.filter((item) => !toUnselect.includes(item));
};

const updateFiles = (deleted: string[]) => {
  selectedFileIds.value = selectedFileIds.value.filter((item) => !deleted.includes(item));
  filesGroups.value.forEach((group) => {
    group.files = group.files.filter((file) => !deleted.includes(file.path));
  });
  filesGroups.value = filesGroups.value.filter((group) => group.files.length > 0);
};

const handleDeleteFiles = async (paths: string[]) => {
  console.info(`handleDeleteFiles`, paths);
  const success = await window.api.deleteFiles(paths);
  if (success) {
    updateFiles(paths);
  } else {
    toast('删除文件失败');
  }
};

const handleDeleteAllConfirm = () => {
  deleteAllAsk.value = false;
  handleDeleteFiles(toRaw(selectedFileIds.value));
};

const handleSelectFolderClick = async () => {
  const folderPath = await window.api.selectFolder();
  console.info(`folder path`, folderPath);
  targetFolder.value = folderPath;
};

window.api.listenFromMain(MainMessage.BeforeHash, (path) => {
  console.info(`before hash of file `, path);
});

window.api.listenFromMain(MainMessage.AfterHash, (file) => {
  updateProgress(file);
});

window.api.listenFromMain(MainMessage.BeforeAllHash, (files) => {
  initProgress(files);
});
</script>

<style lang="less" scoped>
.scan-list {
  max-height: 400px;
  overflow: auto;
}
</style>
