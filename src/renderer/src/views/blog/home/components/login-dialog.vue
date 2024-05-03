<template>
  <div class="pa-4 text-center inline-block">
    <v-dialog v-model="dialog" max-width="600" @update:model-value="handleUpdateModelValue">
      <template #activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-account"
          text="登录"
          variant="tonal"
          v-bind="activatorProps"
        ></v-btn>
      </template>
      <v-form validate-on="submit lazy" @submit.prevent="handleConfirm">
        <v-card prepend-icon="mdi-account" title="User Profile">
          <v-card-text>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="username"
                  :label="t('blog.username')"
                  required
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
                  required
                  :rules="rules.password"
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
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@renderer/stores/user';

const { t } = useI18n({ useScope: 'global' });

const dialog = ref(false);
const emit = defineEmits<{
  (e: 'confirm'): void;
}>();

const loading = ref(false);
const username = ref('');
const password = ref('');

const rules = {
  username: [(v: string) => !!v || t('blog.usernameRequired')],
  password: [(v: string) => !!v || t('blog.passwordRequired')],
};

const { login } = useUserStore();

const handleConfirm = async (event) => {
  loading.value = true;
  const results = await event;
  if (results.valid) {
    const loginSuccess = await login(username.value, password.value);
    if (loginSuccess) {
      emit('confirm');
      dialog.value = false;
    }
  }
  loading.value = false;
};

const handleUpdateModelValue = () => {
  username.value = '';
  password.value = '';
};
</script>

<style lang="less" scoped></style>
