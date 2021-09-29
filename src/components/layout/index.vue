<template>
  <el-container class="layout-container">
    <el-aside v-if="layout === 'lm'" width="auto">
      <!-- <Sidebar /> -->
      <Menu :menus="menus" />
    </el-aside>
    <el-container>
      <el-header class="layout-header" :height="`${headerHeight}px`">
        <Header>
          <!-- <Sidebar v-if="layout === 'tm'" horizontal /> -->
          <Menu v-if="layout === 'tm'" horizontal :menus="menus" />
          <Breadcrumb v-if="showBread('header')" style="height: 100%;" />
        </Header>
      </el-header>
      <el-container>
        <el-aside v-if="layout === 'lb'" width="auto">
          <!-- <Sidebar /> -->
          <Menu :menus="menus" />
        </el-aside>
        <el-container class="layout-contnet" direction="vertical">
          <Breadcrumb v-if="showBread('main')" class="pl12" />
          <el-main class="layout-main ma10 pa10 bgW">
            <router-view v-slot="{ Component }">
              <transition name="el-fade-in-linear" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </el-main>
          <el-footer v-if="showFooter">Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup>
import { computed, unref } from 'vue';
import { store } from '@uts/instance';

import Header from './header.vue';
import Sidebar from './sidebar.vue';
import Breadcrumb from './breadcrumb.vue';
import Menu from '../menu/index.vue';

import menus from '../../config/menus';

const layout = computed(() => store.getters.layout);
const headerHeight = computed(() => store.getters.headerHeight);
const breadPlace = computed(() => store.getters.breadPlace);
const showFooter = computed(() => store.getters.footer);

function showBread(con) {
  if (unref(layout) === 'tm') {
    if (con === 'header') return false;
  } else if (con !== unref(breadPlace)) return false;
  return true;
}

</script>

<style lang="scss" scoped>
.layout-container {
  height: 100%;
}
.layout-header {
  padding: 0 12px;
  z-index: 1;
  border-bottom: solid 1px #e6e6e6;
  // box-shadow: 4px 2px 8px 1px #f0f1f2;
}
.layout-main {
  height: 0;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .1);
}
.layout-contnet {
  background: #f3f8fd;
}
</style>
