<template>
  <div class="pa-4 text-center inline-block">
    <v-dialog v-model="dialog" max-width="600">
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
                  label="Username*"
                  :rules="rules.username"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="passwordAgain"
                  label="Confirm Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <small class="text-caption text-medium-emphasis">*indicates required field</small>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>
            <v-btn
              color="primary"
              text="Save"
              variant="tonal"
              type="submit"
              :loading="loading"
            ></v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';

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
    (v: string) => !!v || 'Username is required',
    async (v: string) => {
      const isUsernameExists = await window.api.user.checkUserExists(v);
      return isUsernameExists ? 'Username already exists' : true;
    },
  ],
};

const handleConfirm = async (event) => {
  loading.value = true;

  const results = await event;

  loading.value = false;
  console.info(results);
  if (results.value) {
    dialog.value = false;
    emit('confirm', { name: username.value, password: password.value });
  }
};
</script>

<style lang="less" scoped></style>
