import { cloneDeep } from 'lodash';
import { ref } from 'vue';
import type { FileItem } from '@renderer/types/index';
import ScanProgress from './scan-progress.vue';

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

  /**
   * @description: Start fake data for testing
   */
  const startFakeData = () => {
    const fakeData = Array.from({ length: 2000 }, (_, index) => ({
      path: `fake-path-${index}`,
      size: 1024,
      hash: `fake-hash-${index}`,
    }));

    allFiles.value = fakeData;
    let scanningCount = 0;

    const handle = setInterval(() => {
      if (scanningCount < fakeData.length) {
        const pushCountPerTime = 100;
        const fd = fakeData.slice(scanningCount, scanningCount + pushCountPerTime);

        scanningFiles.value.push(...fd);
        scanningCount += pushCountPerTime;
        console.info(`herex`, fd);
      } else {
        clearInterval(handle);
      }
    }, 500);
  };

  return {
    allFiles,
    scanningFiles,
    finishedFiles,
    resetProgress,
    initProgress,
    updateProgress,
    startFakeData,
    ScanProgress,
  };
};
