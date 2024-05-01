<template>
  <div v-show="operation === 'edit'" class="px-20 py-10">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode"
    />
    <Editor
      v-model="valueHtml"
      style="height: 500px; overflow-y: hidden"
      :default-config="editorConfig"
      :mode="mode"
      @on-created="handleCreated"
    />
    <div class="pt-5 flex justify-between items-center">
      <v-btn @click="handlePreviewClick">{{ $t('common.preview') }}</v-btn>
      <div>
        <v-btn @click="handleSaveClick">{{ $t('common.save') }}</v-btn>
        <v-btn class="ml-2" @click="handleCancelClick">{{ $t('common.cancel') }}</v-btn>
      </div>
    </div>
  </div>
  <div v-show="operation === 'preview'" class="px-20 py-10">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="preview-content" v-html="valueHtml"></div>
    <div class="pt-5">
      <v-btn @click="handlePreviewBackClick">{{ $t('common.back') }}</v-btn>
    </div>
  </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css'; // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const operation = ref('edit');

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref('<p>hello</p>');

const mode = ref('default');

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>';
  }, 1500);
});

const toolbarConfig = {};
const editorConfig = { placeholder: '请输入内容...' };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

const handlePreviewClick = () => {
  operation.value = 'preview';
};

const handleSaveClick = () => {
  const editor = editorRef.value;
  if (editor == null) return;
  console.log(editor.getHtml());
};

const handleCancelClick = () => {
  router.back();
};

const handlePreviewBackClick = () => {
  operation.value = 'edit';
};
</script>

<style lang="less" scoped>
.preview-content {
  min-height: 580px;
}
</style>
