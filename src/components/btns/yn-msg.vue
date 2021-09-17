<template>
  <el-popover trigger="hover" width="300px" @show="state.showTabs = true">
    <template #reference>
      <div class="header-menu-btn" @click="goRouterMsg">
        <el-badge is-dot class="item" type="danger">
          <i class="el-icon-bell" />
        </el-badge>
      </div>
    </template>
    <el-tabs v-if="state.showTabs" v-model="state.activeName" stretch>
      <el-tab-pane label="订单消息" name="first">订单消息</el-tab-pane>
      <el-tab-pane label="系统消息" name="second">系统消息</el-tab-pane>
    </el-tabs>
  </el-popover>
</template>

<script setup>
import { reactive, onBeforeUnmount } from 'vue';
import { store, router } from '@uts/instance';
import { ElNotification } from 'element-plus';

const state = reactive({
  showTabs: false,
  activeName: 'first',
});

const uid = store.getters.userinfo.userId;
// const ws = new WebSocket(import.meta.env.VITE_WS_SERVER);
const ws = new WebSocket('ws://192.168.111.179:3729');

ws.onopen = () => {
  console.log('已链接');
  ws.send(JSON.stringify({ uid }));
};

ws.onmessage = ({ data }) => {
  if (document.hidden) {
    notification('您有新消息！', {
      body: data,
      tag: '',
      unique: true,
      duration: 4500,
    });
  } else {
    ElNotification({ title: '您有新消息！', message: data });
  }
};

onBeforeUnmount(() => {
  ws.close(1000, JSON.stringify({ uid }));
});

const nots = {};

function goRouterMsg() {
  console.log('go Message');
}

function notification(title, options) {
  const winNotification = window.Notification || window.mozNotification || window.webkitNotification;
  winNotification?.requestPermission((status) => {
    if (status === 'granted') {
      const { duration, tag, unique } = options;
      const isUnique = unique && tag;
      if (isUnique) nots[tag]?.close();
      const not = new Notification(title, options);
      if (isUnique) nots[tag] = not;
      if (duration) {
        setTimeout(() => {
          not.close();
          delete nots[tag];
        }, duration);
      }
    }
  });
}

</script>

<style lang="scss" scoped>
</style>
