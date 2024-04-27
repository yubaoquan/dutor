<template>
  <div>
    <div class="text-center">博客系统</div>
    <div v-if="route.path === '/blog'">
      <div>
        <router-link to="/blog/public-blogs" class="pa-4"
          ><v-btn class="inline-block" text="公共博客列表" variant="tonal"></v-btn
        ></router-link>

        <register-dialog @confirm="handleRegisterConfirm"></register-dialog>
        <login-dialog @confirm="handleLoginConfirm"></login-dialog>
      </div>
      <div>
        <v-btn @click="handleGetUsersClick">get users</v-btn>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import RegisterDialog from './components/register-dialog.vue';
import LoginDialog from './components/login-dialog.vue';

const route = useRoute();

const handleRegisterConfirm = async (data) => {
  console.info(`register confirm`);
  console.info(data);
  const res = await window.api.user.addUser(data);
  console.info(res);
};

const handleGetUsersClick = async () => {
  const res = await window.api.user.getUsers();
  console.info(res);
};

const handleLoginConfirm = async (data) => {
  console.info(`login confirm`, data);
};
</script>

<style lang="less" scoped></style>
