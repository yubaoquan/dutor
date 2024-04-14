import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import messages from '@intlify/unplugin-vue-i18n/messages';
import vuetify from './plugins/vuetify';

import './assets/base.css';
import './assets/style.css';
import App from './App.vue';
import router from './router/index';

const app = createApp(App);

const i18n = createI18n({
  legacy: false,
  locale: 'cn',
  fallbackLocale: 'en',
  messages,
});

app.use(i18n);
app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount('#app');
