import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './style.css'
import App from './App.vue'
import { useCoreStore } from './stores/core';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

router.beforeEach((to, from, next) => {
  console.log('test');
  const coreStore = useCoreStore();
  const pageTitle: string = to.meta.title as string || 'Default Title';
  coreStore.setPageHeader(pageTitle);
  next();
});

app.mount('#app');
