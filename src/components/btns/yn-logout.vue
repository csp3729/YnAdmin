<template>
  <el-button v-if="button" size="small" icon="el-icon-switch-button" @click="handleLogout" />
  <span v-else @click="handleLogout">
    <slot />
  </span>
</template>

<script setup>
import { defineProps, inject } from 'vue';
import { ElMessageBox } from 'element-plus';
import { store, router } from '@uts/instance';

defineProps({ button: Boolean });

const http = inject('http');

function handleLogout() {
  ElMessageBox.confirm('是否退出系统', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  }).then(() => {
    http.logout().then((res) => {
      console.log(res);
      store.commit('CLEAR_LOCK');
      store.commit('CLEAR_USER_AUTH');
      store.commit('CLEAR_USER_LOGIN');
      router.push('/login');
    });
  }).catch((err) => {
    console.log(err);
  });
}
</script>
