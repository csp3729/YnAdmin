<template>
  <SettingItem v-for="(item, index) in colors" :key="index" v-bind="item">
    <template #theme>
      <el-color-picker v-model="themeColor" size="mini" :predefine="themeColors" />
    </template>
    <template #menu>
      <el-color-picker v-model="menuColor" size="mini" :predefine="menuColors" />
    </template>
  </SettingItem>
</template>

<script setup>
import { computed } from 'vue';
import { store } from '@uts/instance';
import changeTheme from './common/theme';

import SettingItem from './common/item.vue';

const colors = [
  { title: '主题色', slot: 'theme' },
  { title: '菜单栏', slot: 'menu' },
];

const themeColors = ['#409EFF', '#FF4500', '#FF8C00', '#FFD700', '#90EE90', '#00CED1', '#1E90FF', '#C71585'];

const themeColor = computed({
  get: () => store.getters.theme,
  set: (val) => {
    if (!val && store.getters.theme === '#409EFF') return;
    store.dispatch('ChangeSetting', { key: 'theme', value: val || '#409EFF' });
    changeTheme(val || '#409EFF');
  },
});

const menuColors = ['#000', '#1E90FF', '#44CEFF', '#42586F'];

const menuColor = computed({
  get: () => store.getters.menuColor,
  set: (val) => {
    store.dispatch('ChangeSetting', { key: 'menuColor', value: val });
  },
});

</script>
