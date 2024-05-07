<template>
  <v-row dense class="my-2">
    <v-col cols="8">
      <v-autocomplete
        v-model="selectedTags"
        clearable
        chips
        :label="$t('blog.tag')"
        :items="allTags"
        variant="solo-inverted"
        multiple
        density="compact"
        hide-details="auto"
        closable-chips
      >
        <template #item="{ item }">
          <v-list-item
            density="compact"
            :disabled="isTagDisabled(item)"
            @click.capture.stop="handleToggleTag(item)"
          >
            <template #prepend>
              <v-list-item-action end>
                <v-checkbox
                  density="compact"
                  hide-details
                  :model-value="selectedTags.includes(item.value)"
                ></v-checkbox>
              </v-list-item-action>
            </template>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </template>
      </v-autocomplete>
    </v-col>
    <v-col cols="4">
      <div v-if="isEditingNewTag" class="flex items-start justify-end">
        <v-text-field
          v-model="newTag"
          autofocus
          clearable
          density="compact"
          hide-details="auto"
          :label="$t('blog.newTag')"
          variant="solo-inverted"
          maxlength="10"
          counter
          :error="tagError"
          :error-messages="tagErrorMsg"
          @keydown.enter="handleEditTagConfirm"
          @update:model-value="clearTagError"
        ></v-text-field>
        <v-btn
          class="ml-2"
          density="comfortable"
          icon="mdi-check"
          @click="handleEditTagConfirm"
        ></v-btn>
        <v-btn
          class="ml-2"
          density="comfortable"
          icon="mdi-close"
          @click="handleEditTagCanedlClick"
        ></v-btn>
      </div>
      <v-btn
        v-else
        class="ml-2"
        density="comfortable"
        icon="mdi-plus"
        @click="handleAddTagClick"
      ></v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({ useScope: 'global' });

const props = defineProps<{
  isPublic: boolean;
}>();
const selectedTags = ref<string[]>([]);
const allTags = ref<string[]>([]);
const isEditingNewTag = ref(false);
const newTag = ref('');
const tagError = ref(false);
const tagErrorMsg = ref('');

const fetchAllTags = async () => {
  const res = await window.api.blog.getTags({ isPublic: props.isPublic });
  console.info('tags', res);
  allTags.value = res.data.map((item) => item.name);
};
const MAX_TAGS = 6;

const isTagDisabled = (item) =>
  selectedTags.value.length >= MAX_TAGS && !selectedTags.value.includes(item.value);

const init = () => {
  fetchAllTags();
};

const handleAddTagClick = () => {
  newTag.value = '';
  isEditingNewTag.value = true;
};

const handleToggleTag = (item) => {
  if (selectedTags.value.includes(item.value)) {
    selectedTags.value = selectedTags.value.filter((tag) => tag !== item.value);
  } else {
    selectedTags.value.push(item.value);
  }
};

const clearTagError = () => {
  tagError.value = false;
  tagErrorMsg.value = '';
};

const handleEditTagConfirm = () => {
  if (newTag.value.trim() === '') {
    tagError.value = true;
    tagErrorMsg.value = t('blog.pleaseEnterTag');
    return;
  }

  if (allTags.value.includes(newTag.value)) {
    tagError.value = true;
    tagErrorMsg.value = t('blog.tagAlreadyExists');
    return;
  }

  clearTagError();

  selectedTags.value.push(newTag.value);
  allTags.value.push(newTag.value);
  isEditingNewTag.value = false;
};

const handleEditTagCanedlClick = () => {
  isEditingNewTag.value = false;
  clearTagError();
};

const getSelectedTags = () => selectedTags.value;

defineExpose({
  init,
  getSelectedTags,
});
</script>

<style lang="less" scoped></style>
