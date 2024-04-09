<template>
  <tree-select
    v-model:value="value"
    tree-data-simple-mode
    style="width: 100%"
    :dropdown-style="{ maxHeight: '500px', overflow: 'auto' }"
    placeholder="请选择文件夹"
    allow-clear
    :tree-data="treeData"
    tree-node-filter-prop="label"
    :load-data="onLoadData"
    :list-height="400"
    @select="handleNodeSelect"
  ></tree-select>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, defineEmits } from 'vue';
import { TreeSelect } from 'ant-design-vue';
import type { TreeSelectProps } from 'ant-design-vue';
import type { LegacyDataNode } from 'ant-design-vue/es/vc-tree-select/interface';

const value = ref<string>();
const treeData = ref<TreeSelectProps['treeData']>([]);

// { id: 1, pId: 0, value: '1', title: 'Expand to load' },
onMounted(async () => {
  const folders = await window.api.getFolders();
  treeData.value = folders.map((item) => ({
    id: item.path,
    pId: '',
    value: item.path,
    title: item.name,
  }));
});

const emit = defineEmits<{
  (e: 'select', id: string): void;
}>();

watch(value, () => {
  console.log(value.value);
});

const handleNodeSelect = (v) => {
  emit('select', v);
};

const onLoadData = (treeNode: LegacyDataNode) =>
  new Promise(async (resolve) => {
    const { id } = treeNode.dataRef;
    const folders = await window.api.getFolders(id);
    treeData.value = treeData.value!.concat(
      folders.map((item) => ({
        id: item.path,
        pId: id,
        value: item.path,
        title: item.name,
      })),
    );
    resolve(true);
  });
</script>

<style lang="less" scoped></style>
