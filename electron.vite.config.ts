import { fileURLToPath, URL } from 'node:url';
import vuetify from 'vite-plugin-vuetify';
import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin, bytecodePlugin } from 'electron-vite';
import vue from '@vitejs/plugin-vue';
import VueDevTools from 'vite-plugin-vue-devtools';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()],
    resolve: {
      alias: {
        '@main': resolve('src/main'),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
  preload: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()],
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    plugins: [
      vue(),
      VueDevTools(),
      vuetify({ autoImport: true }),

      VueI18nPlugin({
        include: [resolve(__dirname, 'src/renderer/src/lang/**/*')],
      }),
    ],
  },
});
