<template>
  <div>
    <v-card class="mx-auto" max-width="700">
      <v-toolbar color="purple" density="compact">
        <v-toolbar-title>
          <v-tooltip :text="hash" location="bottom">
            <template #activator="{ props: prps }">
              <div v-bind="prps" @click="foo(prps)">{{ hash.slice(0, 20) }}</div>
            </template>
          </v-tooltip>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn density="comfortable" icon="mdi-delete" @click="handleDeleteAllClick"></v-btn>
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

  <DeleteAllConfirm
    :visible="deleteAllAsk"
    @cancel="handleDeleteAllCancel"
    @confirm="handleDeleteAllConfirm"
  ></DeleteAllConfirm>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import DeleteAllConfirm from './delete-all-confirm.vue';

type FileItem = {
  id: string;
  name: string;
  path: string;
};

const props = defineProps<{
  hash: string;
  files: FileItem[];
}>();

const foo = (a: any) => {
  console.info(`props`, a);
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
</script>

<style lang="less" scoped></style>
