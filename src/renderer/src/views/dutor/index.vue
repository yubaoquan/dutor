<template>
  <v-container class="bg-surface-variant" fluid>
    <template v-if="isScanning">
      <scan-progress
        :all-files="allFiles"
        :scanning-files="scanningFiles"
        :finished-files="finishedFiles"
      ></scan-progress>
    </template>
    <template v-else>
      <v-row>
        <v-col cols="3">
          <v-btn class="mr-2" color="#66BB6A" @click="handleSelectFolderClick">{{
            $t('dutor.selectFolder')
          }}</v-btn>
          <filter-setting></filter-setting>
        </v-col>
        <v-col cols="6">
          <div
            v-for="folderPath in targetFolders"
            :key="folderPath"
            class="flex justify-between items-center mb-2"
          >
            <span>{{ folderPath }}</span>
            <v-btn
              density="compact"
              icon="mdi-close"
              @click="handleDeleteTargetFolderClick(folderPath)"
            ></v-btn>
          </div>
        </v-col>
        <v-col cols="3" class="text-right">
          <v-btn
            color="primary"
            :loading="isScanning"
            :disabled="!targetFolders.length"
            @click="handleScanClick"
            >{{ $t('dutor.startScan') }}</v-btn
          >
        </v-col>
      </v-row>

      <v-row v-if="filesGroups.length">
        <v-col>
          <div v-if="selectedFileIds.length" class="text-right pr-2">
            <v-btn color="red" @click="handleDeleteAllClick">{{
              $t('dutor.deleteAllSelectedFiles')
            }}</v-btn>
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
import { useI18n } from 'vue-i18n';
import { ref, inject, toRaw } from 'vue';
import { MainMessage } from '@/common/message';
import type { FileItem } from '@renderer/types/index';
import FilterSetting from './components/filter-setting/index.vue';
import FileList from './components/file-list/index.vue';
import useDeleteAll from './components/delete-all-confirm/index';
import useScanProgress from './components/scan-progress/index';

const toast: any = inject('toast');
const { t } = useI18n({ useScope: 'global' });
type HashItem = {
  hash: string;
  files: FileItem[];
};

const {
  allFiles,
  scanningFiles,
  finishedFiles,
  resetProgress,
  initProgress,
  updateProgress,
  ScanProgress,

  // startFakeData,
} = useScanProgress();
const targetFolders = ref<string[]>([]);
const isScanning = ref(false);

const filesGroups = ref<HashItem[]>([]);
const selectedFileIds = ref<string[]>([]);

const { DeleteAllConfirm, deleteAllAsk, handleDeleteAllCancel, handleDeleteAllClick } =
  useDeleteAll();

const handleScanClick = async () => {
  isScanning.value = true;
  resetProgress();
  const result = await window.api.dutor.scanDuplicatedFiles(toRaw(targetFolders.value));

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
    toast(t('dutor.noDuplicatedFilesFound'));
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
  filesGroups.value = filesGroups.value.filter((group) => group.files.length > 1);
};

const handleDeleteFiles = async (paths: string[]) => {
  const success = await window.api.dutor.deleteFiles(paths);
  if (success) {
    updateFiles(paths);
  } else {
    toast(t('dutor.failToDeleteFiles'));
  }
};

const handleDeleteAllConfirm = () => {
  deleteAllAsk.value = false;
  handleDeleteFiles(toRaw(selectedFileIds.value));
};

const handleSelectFolderClick = async () => {
  const folderPaths = await window.api.dutor.selectFolder();
  folderPaths.forEach((folderPath) => {
    if (!targetFolders.value.includes(folderPath)) {
      targetFolders.value.push(folderPath);
    }
  });
};

const handleDeleteTargetFolderClick = (folderPath: string) => {
  targetFolders.value = targetFolders.value.filter((path) => path !== folderPath);
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
