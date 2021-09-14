<template>
  <div class="lock-container df-cc">
    <div class="lock-form">
      <h3>User Name</h3>
      <el-input v-model="password" placeholder="请输入锁屏密码" type="password" @keyup.enter="handleUnlock">
        <template #append>
          <el-button size="mini" icon="el-icon-unlock" @click="handleUnlock"></el-button>
          <YnLogout button />
        </template>
      </el-input>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import md5 from 'js-md5';

import { store, router } from '@uts/instance';
import { YnLogout } from '@com/btns';

const password = ref('');

const handleUnlock = () => {
  if (md5(password.value) !== store.state.app.lockPasswd) {
    ElMessage.error('解锁密码错误,请重新输入');
    password.value = '';
    return;
  }
  store.dispatch('SetLock');
  // router.push('/');
  router.go(-1);
};
</script>

<style lang="scss" scoped>
.lock-container {
  height: 100%;
  background: {
    image: url('@/assets/images/lockLogin.png');
    size: cover;
  };
}
.lock-form {
  h3 {
    color: #fff;
    margin: 15px 0;
  }
}
</style>
