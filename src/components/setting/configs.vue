<template>
  <SettingItem v-for="(item, index) in configs" :key="index" v-bind="item" />
</template>

<script setup>
import { store } from '@uts/instance';

import SettingItem from './common/item.vue';

const configs = [
  {
    title: '顶部栏高度', model: 'headerHeight', type: 'number', min: 48, max: 60,
  },
  {
    title: '顶部菜单位置',
    model: 'topMenuPlace',
    type: 'select',
    options: [{ value: 'left', label: '左侧' }, { value: 'center', label: '居中' }, { value: 'right', label: '右侧' }],
    disabled: () => store.getters.layout !== 'tm',
  },
  {
    title: '菜单折叠按钮',
    model: 'collapsePlace',
    type: 'select',
    options: [{ value: 'menu', label: '侧边栏' }, { value: 'breadcrumb', label: '顶部' }],
    disabled: () => store.getters.layout === 'tm' || !store.getters.breadcrumb,
  },
  {
    title: '面包屑导航',
    model: 'breadPlace',
    type: 'select',
    options: [{ value: 'header', label: '头部' }, { value: 'main', label: '主体' }],
    disabled: () => store.getters.layout === 'tm',
  },
  {
    title: '分页栏位置',
    model: 'pagingPlace',
    type: 'select',
    options: [{ value: 'tl', label: '左侧' }, { value: 'tc', label: '居中' }, { value: 'tr', label: '右侧' }],
  },
  {
    title: '菜单手风琴模式',
    model: 'unique',
    type: 'switch',
    disabled: () => store.getters.layout === 'tm',
  },
  {
    title: '显示面包屑导航',
    model: 'breadcrumb',
    type: 'switch',
  },
  {
    title: '显示页尾',
    model: 'footer',
    type: 'switch',
  },
];

</script>
