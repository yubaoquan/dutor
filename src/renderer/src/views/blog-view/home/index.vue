<template>
  <div>
    <div class="text-center">博客系统</div>
    <div v-if="route.path === '/blog'">
      <div>
        <router-link to="/blog/common">公共博客列表</router-link>
      </div>
      <div>
        <router-link to="/blog/login">登入私密账户</router-link>
      </div>
      <div>
        <register-dialog @confirm="handleRegisterConfirm"></register-dialog>
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
</script>

<style lang="less" scoped></style>
