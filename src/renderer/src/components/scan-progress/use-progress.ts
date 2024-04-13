import { cloneDeep } from 'lodash';
import { ref } from 'vue';
import type { FileItem } from '../../types/index';

export default () => {
  const allFiles = ref<FileItem[]>([]);
  const scanningFiles = ref<FileItem[]>([]);
  const finishedFiles = ref<FileItem[]>([]);

  const resetProgress = () => {
    scanningFiles.value = [];
    finishedFiles.value = [];
  };

  const initProgress = (files: FileItem[]) => {
    allFiles.value = cloneDeep(files);
    scanningFiles.value = cloneDeep(files);
  };

  const updateProgress = (file: FileItem) => {
    finishedFiles.value.push({ path: file.path });
    scanningFiles.value = scanningFiles.value.filter((item) => item.path !== file.path);
  };

  return {
    allFiles,
    scanningFiles,
    finishedFiles,
    resetProgress,
    initProgress,
    updateProgress,
  };
};
