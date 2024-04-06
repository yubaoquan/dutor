import { createApp } from 'vue';
import { createPinia } from 'pinia';
import vuetify from './plugins/vuetify.ts';

import './assets/style.css';
import App from './App.vue';
import router from './router/index.ts';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount('#app');
