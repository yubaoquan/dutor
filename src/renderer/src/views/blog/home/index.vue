<template>
  <div>
    <div v-if="userStore.isLoggedIn" class="text-right p-2">
      <v-chip variant="outlined" class="mr-2">{{ userStore.username }}</v-chip>
      <v-btn @click="userStore.logout">{{ $t('blog.logout') }}</v-btn>
    </div>
    <div v-if="route.path === '/blog'">
      <div>
        <router-link to="/blog/public" class="pa-4"
          ><v-btn class="inline-block" :text="$t('blog.publicBlogsList')" variant="tonal"></v-btn
        ></router-link>

        <template v-if="!userStore.isLoggedIn">
          <register-dialog @confirm="handleRegisterConfirm"></register-dialog>
          <login-dialog @confirm="handleLoginConfirm"></login-dialog>
        </template>
        <router-link v-else :to="`/blog/private/${userStore.userId}`" class="pa-4"
          ><v-btn class="inline-block" :text="$t('blog.privateBlogsList')" variant="tonal"></v-btn
        ></router-link>
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
import { useUserStore } from '@renderer/stores/user';
import RegisterDialog from './components/register-dialog.vue';
import LoginDialog from './components/login-dialog.vue';

const route = useRoute();

const handleRegisterConfirm = async (data) => {
  console.info(data);
  const res = await window.api.user.addUser(data);
  console.info(res);
};

const userStore = useUserStore();

const handleGetUsersClick = async () => {
  const res = await window.api.user.getUsers();
  console.info(res);
};

const handleLoginConfirm = () => {
  console.info(`isLoggedIn xx`, userStore.isLoggedIn);
};
</script>

<style lang="less" scoped></style>
