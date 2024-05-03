import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false);
  const username = ref('');
  const userId = ref('');

  const login = async (name: string, password: string) => {
    const loginResult = await window.api.user.login(name, password);
    if (loginResult.success) {
      console.info(`login success`, loginResult);
      isLoggedIn.value = true;
      username.value = name;
      userId.value = loginResult.user!.id;
    } else {
      console.info(`login fail`, loginResult);
    }

    return loginResult.success;
  };

  const logout = () => {
    isLoggedIn.value = false;
    console.info(`logout`);
  };

  return { isLoggedIn, username, userId, login, logout };
});
