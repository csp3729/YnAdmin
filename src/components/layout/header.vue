<template>
  <div class="header-content df-cc">
    <div class="header-left df fai-c">
      <template v-if="$store.getters.layout !== 'lm'">
        <img class="mr10" src="@/assets/logo.png" width="28" height="28" >
        <h2 class="mr30">Header</h2>
      </template>
    </div>
    <div class="header-center flex1">
      <slot />
    </div>
    <div class="header-right df-cc fjc-fe ml30">
      <YnMsg />
      <YnLock />
      <YnScreen />
      <el-dropdown class="df-cc ml10 pointer avatar" trigger="click">
        <div class="df fai-c">
          <el-avatar size="small" icon="el-icon-s-custom" />
          <span class="px10">{{ $store.getters.userinfo.userName }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="">主控面板</el-dropdown-item>
            <el-dropdown-item icon="">个人中心</el-dropdown-item>
            <el-dropdown-item icon="">
              <YnLogout>退出登录</YnLogout>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <Setting />
    </div>
  </div>
</template>

<script setup>
import {
  YnLock, YnLogout, YnScreen, YnMsg,
} from '@com/btns';
import Setting from '@com/setting/index.vue';

</script>

<style lang="scss" scoped>
.header-content, .header-center, .header-left, .header-right {
  height: 100%;
}
:deep(.header-menu-btn) {
  height: 100%;
  max-height: 46px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #303133;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
  }
}
</style>
