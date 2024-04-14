import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useTheme } from 'vuetify';

export const useThemeStore = defineStore('theme', () => {
  const theme = useTheme();

  const themeName = ref<string>(theme.global.name.value);

  const toggleTheme = (isDark) => {
    theme.global.name.value = isDark ? 'light' : 'dark';
    themeName.value = theme.global.name.value;
  };

  const setTheme = (isDark) => {
    theme.global.name.value = isDark ? 'dark' : 'light';
    themeName.value = theme.global.name.value;
  };

  return { themeName, toggleTheme, setTheme };
});
