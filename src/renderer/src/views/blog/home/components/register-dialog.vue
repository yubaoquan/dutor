<template>
  <div class="pa-4 text-center inline-block">
    <v-dialog v-model="dialog" max-width="600" @update:model-value="handleUpdateModelValue">
      <template #activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-account"
          text="注册"
          variant="tonal"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card prepend-icon="mdi-account" title="User Profile">
        <v-form validate-on="submit lazy" @submit.prevent="handleConfirm">
          <v-card-text>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="username"
                  :label="t('blog.username')"
                  :rules="rules.username"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  :label="$t('blog.password')"
                  type="password"
                  :rules="rules.password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="passwordAgain"
                  :label="$t('blog.passwordAgain')"
                  type="password"
                  :rules="rules.passwordAgain"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              :text="$t('common.confirm')"
              variant="tonal"
              type="submit"
              :loading="loading"
            ></v-btn>
            <v-btn :text="$t('common.cancel')" variant="plain" @click="dialog = false"></v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({ useScope: 'global' });

const dialog = ref(false);
const emit = defineEmits<{
  (e: 'confirm', data: { name: string; password: string }): void;
}>();

const loading = ref(false);
const username = ref('');
const password = ref('');
const passwordAgain = ref('');

const rules = {
  username: [
    (v: string) => !!v || t('blog.usernameRequired'),
    async (v: string) => {
      const isUsernameExists = await window.api.user.checkUserExists(v);
      return isUsernameExists ? t('blog.usernameExists') : true;
    },
  ],
  password: [
    (v: string) => !!v || t('blog.passwordRequired'),
    (v: string) => v.length >= 6 || t('blog.passwordLeastLength'),
  ],
  passwordAgain: [(v: string) => v === password.value || t('blog.passwordAgainNotMatch')],
};

const handleConfirm = async (event) => {
  loading.value = true;

  const results = await event;

  console.info(results);
  if (results.valid) {
    dialog.value = false;
    emit('confirm', { name: username.value, password: password.value });
  }
  loading.value = false;
};

const handleUpdateModelValue = () => {
  username.value = '';
  password.value = '';
  passwordAgain.value = '';
};
</script>

<style lang="less" scoped></style>
