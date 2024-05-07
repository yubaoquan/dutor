<template>
  <div v-show="operation === 'edit'" class="p-20 pt-10 enhance-html">
    <div>
      <v-text-field
        v-model="blogTitle"
        :label="$t('blog.title')"
        variant="outlined"
        density="compact"
        hide-details="auto"
        :error="titleError"
        :error-messages="titleErrorMsg"
        maxlength="100"
        counter
        clearable
        @update:model-value="handleTitleChange"
      ></v-text-field>
    </div>
    <div v-if="!isPublic">
      <v-switch
        v-model="isBlogPublic"
        :label="`${$t('blog.isPublic')}: ${isBlogPublic ? t('common.yes') : t('common.no')}`"
        hide-details
      ></v-switch>
    </div>
    <BlogTags ref="tagRef" :is-public="!!isPublic" />
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode"
    />
    <div v-if="isContentEmpty">{{ $t('blog.pleaseEnterContent') }}</div>
    <Editor
      v-model="valueHtml"
      style="height: 400px; overflow-y: hidden"
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
    <BlogDetail :title="blogTitle" :tags="previewTags" :content="valueHtml" />
    <div class="pt-5">
      <v-btn @click="handlePreviewBackClick">{{ $t('common.back') }}</v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted, toRaw } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@renderer/stores/user';
import { useI18n } from 'vue-i18n';
import BlogDetail from '@renderer/components/blog-detail.vue';
import BlogTags from './components/blog-tags.vue';

const { t } = useI18n({ useScope: 'global' });

const userStore = useUserStore();
enum OpType {
  Create = 'create',
  Edit = 'edit',
}

const blogTitle = ref('');
const router = useRouter();
const { query } = useRoute();
const { opType = OpType.Create, blogId } = query;
const isPublic = query.public === '1';
const operation = ref('edit');
const titleError = ref(false);
const isBlogPublic = ref(isPublic);
const titleErrorMsg = ref('');
const isContentEmpty = ref(false);

const tagRef = ref();

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref('<p>hello</p>');

const mode = ref('default');

const previewTags = ref<string[]>([]);

// 模拟 ajax 异步获取内容
onMounted(() => {
  tagRef.value?.init();
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
  previewTags.value = tagRef.value?.getSelectedTags();
};

const validate = (content?: string) => {
  if (!blogTitle.value) {
    titleError.value = true;
    titleErrorMsg.value = t('blog.pleaseEnterTitle');
    return false;
  }
  isContentEmpty.value = !content;
  if (!content) return false;
  return true;
};

const handleTitleChange = () => {
  console.info(`title change`);
  titleError.value = false;
  titleErrorMsg.value = '';
};

const handleSaveClick = async () => {
  const editor = editorRef.value;
  if (editor == null) return;
  const content = editor.getHtml();
  if (!validate(content)) return;
  console.log(content);

  const blogData: any = {
    title: blogTitle.value,
    content,
    author: userStore.userId,
    authorAnonymous: !userStore.isLoggedIn,
    tags: toRaw(tagRef.value?.getSelectedTags()),
    isPublic: isBlogPublic.value,
  };

  if (opType === OpType.Create) {
    console.info(`blogData`, blogData);
    await window.api.blog.addBlog(blogData);
  } else {
    console.info(`building...`);
    blogData.id = blogId;
    const res = await window.api.blog.updateBlog(blogData);
    console.info(res);
  }
  router.back();
};

const handleCancelClick = () => {
  router.back();
};

const handlePreviewBackClick = () => {
  operation.value = 'edit';
};
</script>
