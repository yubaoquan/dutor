<template>
  <v-container class="bg-surface-variant">
    <v-row no-gutters>
      <v-col cols="12" sm="4">
        <v-sheet class="ma-2 pa-2">
          <folder-select></folder-select>
          <div class="mt-4 text-right">
            <v-btn color="primary" :loading="isLoading" @click="handleStartClick">开始扫描</v-btn>
          </div>
        </v-sheet>
      </v-col>
      <v-col cols="12" sm="8">
        <div class="text-right pr-2">
          <v-btn color="red" @click="handleDeleteAllClick">删除全部勾选项</v-btn>
        </div>
        <v-sheet class="ma-2 pa-2">
          <file-list
            v-for="filesGroup in filesGroups"
            :key="filesGroup.hash"
            :hash="filesGroup.hash"
            :files="filesGroup.files"
          ></file-list>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import FileList from '@/components/file-list/file-list.vue';
import FolderSelect from '@/components/folder-select/folder-select.vue';

const isLoading = ref(false);
const handleStartClick = () => {
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
};

const handleDeleteAllClick = () => {
  console.info(`delete all files`);
};

const filesGroups = ref([
  {
    hash: '111Tooltipastastast11111111111111112222222222222222aetasetaestaaaaaabbbbbbbbbbbbbbbbbbbbasetasetastastaetetestataset',
    files: [
      {
        id: '1',
        name: 'Notifications',
        path: '1 Notify me about updates to apps or games that I downloaded',
      },
      { id: '2', name: 'Sound', path: '2 Auto-update apps at any time. Data charges may apply' },
      {
        id: '3',
        name: 'Auto-add widgets',
        path: '3 Automatically add home screen widgets when downloads complete',
      },
    ],
  },
  {
    hash: '22222222oltipastastast11111111111111112222222222222222aetasetaestaaaaaabbbbbbbbbbbbbbbbbbbbasetasetastastaetetestataset',
    files: [
      {
        id: '1',
        name: 'Notifications',
        path: '1 Notify me about updates to apps or games that I downloaded',
      },
      { id: '2', name: 'Sound', path: '2 Auto-update apps at any time. Data charges may apply' },
      {
        id: '3',
        name: 'Auto-add widgets',
        path: '3 Automatically add home screen widgets when downloads complete',
      },
    ],
  },
  {
    hash: '333333333astastast11111111111111112222222222222222aetasetaestaaaaaabbbbbbbbbbbbbbbbbbbbasetasetastastaetetestataset',
    files: [
      {
        id: '1',
        name: 'Notifications',
        path: '1 Notify me about updates to apps or games that I downloaded',
      },
      { id: '2', name: 'Sound', path: '2 Auto-update apps at any time. Data charges may apply' },
      {
        id: '3',
        name: 'Auto-add widgets',
        path: '3 Automatically add home screen widgets when downloads complete',
      },
    ],
  },
]);
</script>

<style lang="less" scoped></style>
