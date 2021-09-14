<template>
  <el-tooltip effect="light" content="锁屏" placement="bottom">
    <div class="header-menu-btn" @click="showSetLock">
      <i class="el-icon-lock"></i>
    </div>
  </el-tooltip>
  <el-dialog v-model="state.visible" width="600px" title="设置锁屏密码" append-to-body destroy-on-close>
    <el-form :model="state.form" ref="form" label-width="80px" @submit.prevent>
      <el-form-item label="锁屏密码" prop="passwd" :rules="[{ required: true, message: '锁屏密码不能为空'}]">
        <el-input v-model="state.form.passwd" type="password" placeholder="请输入锁屏密码"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="handleLock">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, unref } from 'vue';
import { store, router } from '@uts/instance';
import md5 from 'js-md5';

const form = ref(null);
const state = reactive({
  visible: false,
  form: { passwd: '' },
});

function showSetLock() {
  state.visible = true;
}

function handleLock() {
  unref(form).validate((valid) => {
    if (valid) {
      store.dispatch('SetLock', md5(state.form.passwd));
      router.push('/lock');
    }
  });
}
</script>
