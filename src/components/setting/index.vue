<template>
  <el-tooltip effect="light" content="设置" placement="bottom">
    <div class="header-menu-btn" @click="openDeawer">
      <i class="el-icon-setting" />
    </div>
  </el-tooltip>
  <el-drawer
    v-model="drawer"
    title="视窗配置"
    append-to-body
    destroy-on-close
    :size="360"
    direction="rtl"
    custom-class="config-drawer"
  >
    <div v-for="(t, i) in list" :key="i" class="config-group">
      <el-divider>{{ t.title }}</el-divider>
      <component :is="t.component" />
    </div>
  </el-drawer>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { store } from '@uts/instance';
import { local } from '@uts';
import changeTheme from './common/theme';

import Layout from './layout.vue';
import Color from './color.vue';
import Configs from './configs.vue';

function initSetting() {
  const { userId } = store.getters;
  const YnAdminSetting = local.get('YN_ADMIN_SETTING');
  if (YnAdminSetting?.[userId]) store.dispatch('InitSetting', YnAdminSetting[userId]);
}

initSetting();

onMounted(() => {
  const { theme } = store.getters;
  if (theme !== '#409EFF') {
    changeTheme(theme);
  }
});

watch(() => store.state.setting, () => {
  local.set('YN_ADMIN_SETTING', { [store.getters.userId]: store.state.setting });
}, { deep: true });

const list = [
  { title: '页面布局', component: Layout },
  { title: '色彩配置', component: Color },
  { title: '页面配置', component: Configs },
];

const drawer = ref(false);

function openDeawer() {
  drawer.value = true;
}

</script>

<style lang="scss" scoped>
:deep(.el-divider__text) {
  font-size: 16px;
  padding-bottom: 12px;
}
.config-group {
  padding-bottom: 20px;
}
</style>

<style>
.config-drawer .el-drawer__body {
  padding: 0 15px;
}
</style>
