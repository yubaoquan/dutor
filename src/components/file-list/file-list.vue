<template>
  <div>
    <v-card class="mx-auto" max-width="700">
      <v-toolbar color="purple">
        <v-toolbar-title>
          <v-tooltip
            text="Tooltipastastast11111111111111112222222222222222aetasetaestaaaaaabbbbbbbbbbbbbbbbbbbbasetasetastastaetetestataset"
            location="bottom"
          >
            <template v-slot:activator="{ props }">
              <div v-bind="props" @click="foo(props)">Hash</div>
            </template>
          </v-tooltip>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn density="comfortable" icon="mdi-delete" @click="handleDeleteAllClick"></v-btn>
      </v-toolbar>

      <v-list
        @click:select="handleFileSelect"
        lines="two"
        :selected="selected"
        select-strategy="classic"
        v-for="file in files"
        :key="file.id"
      >
        <v-list-item :value="file.id">
          <template v-slot:prepend="{ isSelected }">
            <v-list-item-action start>
              <v-checkbox-btn :model-value="isSelected" :update:modelValue="foo"></v-checkbox-btn>
            </v-list-item-action>
          </template>

          <v-list-item-title>{{ file.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ file.path }}</v-list-item-subtitle>

          <template v-slot:append>
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

  <DeleteAllConfirm
    :visible="deleteAllAsk"
    @cancel="handleDeleteAllCancel"
    @confirm="handleDeleteAllConfirm"
  ></DeleteAllConfirm>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import DeleteAllConfirm from './delete-all-confirm.vue';

const foo = (props) => {
  console.info(`props`, props);
};

const needConfirm = ref(null);
const selected = ref(['2', '3']);
const deleteAllAsk = ref(false);
const handleDeleteAllCancel = () => {
  console.info(`cancel`);
  deleteAllAsk.value = false;
};
const handleDeleteAllConfirm = () => {
  console.info(`confirm`);
  deleteAllAsk.value = false;
};

const handleFileSelect = (file) => {
  console.info(`handleFileSelect`, file);
  const { id, value } = file;
  if (value) {
    selected.value.push(id);
  } else {
    selected.value = selected.value.filter((item) => item !== id);
  }
};

const handleDeleteAllClick = () => {
  // selected.value = [];
  console.info(`delete all files`);
  deleteAllAsk.value = true;
};

const handleDeleteFileClick = (file) => {
  console.info(`delete file`, file);
  needConfirm.value = file.id;
};

const handleDeleteFileConfirm = (file) => {
  console.info(`delete file confirm`, file);
  needConfirm.value = null;
};

const handleDeleteFileCancel = (file) => {
  console.info(`delete file cancel`, file);
  needConfirm.value = null;
};

const files = [
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
];
</script>

<style lang="less" scoped></style>
