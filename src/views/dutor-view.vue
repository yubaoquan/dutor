<template>
  <v-container class="bg-surface-variant">
    <v-row no-gutters>
      <v-col cols="12" sm="4">
        <v-sheet class="ma-2 pa-2">
          <v-treeview :items="files" density="compact" selectable>
            <template v-slot:prepend="{ item, open }">
              <v-icon v-if="item.children" :icon="open ? 'mdi-folder-open' : 'mdi-folder'"></v-icon>
              <v-icon v-else icon="mdi-file-document-outline"></v-icon>
            </template>
          </v-treeview>
        </v-sheet>
      </v-col>
      <v-col cols="12" sm="8">
        <v-sheet class="ma-2 pa-2">
          <file-list></file-list>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { VTreeview } from 'vuetify/labs/VTreeview';
import FileList from '@/components/file-list/file-list.vue';

const files = [
  {
    id: 1,
    title: 'Applications :',
    children: [
      { id: 2, title: 'Calendar : app' },
      { id: 3, title: 'Chrome : app' },
      { id: 4, title: 'Webstorm : app' },
    ],
  },
  {
    id: 5,
    title: 'Documents :',
    children: [
      {
        id: 6,
        title: 'vuetify :',
        children: [
          {
            id: 7,
            title: 'src :',
            children: [
              { id: 8, title: 'index : ts' },
              { id: 9, title: 'bootstrap : ts' },
            ],
          },
        ],
      },
      {
        id: 10,
        title: 'material2 :',
        children: [
          {
            id: 11,
            title: 'src :',
            children: [
              { id: 12, title: 'v-btn : ts' },
              { id: 13, title: 'v-card : ts' },
              { id: 14, title: 'v-window : ts' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 15,
    title: 'Downloads :',
    children: [
      { id: 16, title: 'October : pdf' },
      { id: 17, title: 'November : pdf' },
      { id: 18, title: 'Tutorial : html' },
    ],
  },
  {
    id: 19,
    title: 'Videos :',
    children: [
      {
        id: 20,
        title: 'Tutorials :',
        children: [
          { id: 21, title: 'Basic layouts : mp4' },
          { id: 22, title: 'Advanced techniques : mp4' },
          { id: 23, title: 'All about app : dir' },
        ],
      },
      { id: 24, title: 'Intro : mov' },
      { id: 25, title: 'Conference introduction : avi' },
    ],
  },
];
</script>

<style lang="less" scoped></style>
