<template>
  <div class="pa-4 text-center">
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
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="4" sm="6">
              <v-text-field v-model="username" label="First name*" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="password"
                label="Password*"
                type="password"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4" sm="6">
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
          <v-btn color="primary" text="Save" variant="tonal" @click="handleConfirm"></v-btn>
        </v-card-actions>
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

const username = ref('');
const password = ref('');
const passwordAgain = ref('');

const handleConfirm = () => {
  dialog.value = false;
  emit('confirm', { name: username.value, password: password.value });
};
</script>

<style lang="less" scoped></style>
