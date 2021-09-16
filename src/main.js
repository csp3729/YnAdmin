import { createApp } from 'vue';

import ElementPlus from 'element-plus';
// import 'element-plus/lib/theme-chalk/index.css';
import 'element-plus/dist/index.css';

import store from './store';
import router from './router';

// 组件
import comps from './components';

// 指令
import directives from './directives';

// api
import apis from './api';

// 样式
import './styles/index.scss';

import App from './App.vue';

// if (import.meta.env.DEV) window.YN_ADMIN_MOCK = true;

createApp(App)
  .provide('http', apis)
  .use(ElementPlus, { size: 'small' })
  .use(comps)
  .use(directives)
  .use(store)
  .use(router)
  .mount('#app');
