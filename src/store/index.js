import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import getters from './getters';

const files = import.meta.globEager('./modules/**/*.js');
const modules = {};
const persisteds = [];

Object.keys(files).forEach((item) => {
  const key = item.replace(/(\.\/modules\/|\.js)/g, '');
  modules[key] = files[item].default;
  if (modules[key].persisted) {
    persisteds.push(key);
    delete modules[key].persisted;
  }
});

const store = createStore({
  // stats: {},
  // mutations: {},
  // actions: {},
  modules,
  getters,
  plugins: [createPersistedState({ storage: window.sessionStorage, paths: persisteds })],
});

export default store;
