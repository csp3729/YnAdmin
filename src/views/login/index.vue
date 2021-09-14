<template>
  <div class="login-container df-cc fjc-sa">
    <div class="login-info">
      <img src="@/assets/logo.png" @click.ctrl.shift="handleEnv">
      <h2>商家系统管理后台</h2>
      <ul class="login-info-list">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </ul>
    </div>
    <div class="login-form px50 py30 bgW">
      <h4 class="tc mb20">商家登录</h4>
      <el-tabs v-model="state.actinveName">
        <el-tab-pane label="用户名登录" name="user" :disabled="state.loading && state.actinveName !== 'user'">
          <!-- <UserLogin ref="userRef" @handleLogin="login" :loginFun="asyncLogin" /> -->
        </el-tab-pane>
        <el-tab-pane label="手机号登录" name="phone" :disabled="state.loading && state.actinveName !== 'phone'">
          <!-- <PhoneLogin ref="phoneRef" @handleLogin="login" /> -->
        </el-tab-pane>
      </el-tabs>
      <el-form ref="loginForm" :model="state.form" :rules="rules">
        <template v-if="state.actinveName === 'user'">
          <el-form-item prop="account">
            <el-input v-model="state.form.account" prefix-icon="el-icon-user" placeholder="请输入用户名/手机号"></el-input>
          </el-form-item>
           <el-form-item prop="password">
            <el-input v-model="state.form.password" type="password" show-password prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item prop="phone">
            <el-input v-model="state.form.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input v-model="state.form.code" maxlength="6" prefix-icon="el-icon-message" placeholder="请输入验证码">
              <template #append>
                <span :class="['msg-text', { disabled: state.sending || state.time }]" @click="handleSend">{{ state.time? `${state.time}秒后重发`:'发送验证码' }}</span>
              </template>
            </el-input>
          </el-form-item>
        </template>
        <el-form-item>
          <div class="df-sb-cc">
            <el-checkbox v-model="state.record">记住账号</el-checkbox>
            <span v-if="state.actinveName === 'user'" class="login-text-btn" @click="handleForget">忘记密码</span>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="login-submit" type="primary" :loading="state.loading" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import {
  reactive, inject, ref, unref, nextTick,
} from 'vue';
import md5 from 'js-md5';
import { store, router } from '@uts/instance';
import { encryptor, decrypt, local } from '@uts';
import { ElMessage, ElMessageBox } from 'element-plus';

const http = inject('http');

const loginForm = ref(null);
const state = reactive({
  actinveName: 'user',
  form: { account: '', phone: '', password: '' },
  time: 0,
  sending: false,
  isCode: false,
  loading: false,
  record: false,
  showResetPwd: false,
});

const rules = {
  account: [{ required: true, message: '请输入用户名或手机号码', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
};

const recordData = local.get('YN_ADMIN_LOGIN');
if (recordData) {
  const {
    account, password, phone, record,
  } = recordData;
  state.form = { account, phone, password: decrypt(password) };
  state.record = record;
}

const handleSend = () => {
  if (state.time) return;
  unref(loginForm).validateField('phone', (msg) => {
    if (!msg) {
      state.sending = true;
      // 发起请求后执行
      state.time = 10;
      state.sending = false;
      const timer = setInterval(() => {
        state.time--;
        if (state.time === 0) {
          clearInterval(timer);
        }
      }, 1000);
    }
  });
};

const handleForget = () => {
  state.showResetPwd = true;
};

const handleLogin = () => {
  unref(loginForm).validate(async (valid) => {
    if (valid) {
      state.loading = true;
      const { code, ...data } = state.form;
      if (state.record) {
        local.set('YN_ADMIN_LOGIN', { ...data, password: encryptor(data.password), record: true });
      } else {
        local.remove('YN_ADMIN_LOGIN');
      }
      http.login({ ...state.form, password: md5(state.form.password), loginSource: 'web' }).then((res) => {
        console.log(res);
        const { accessToken: { accessToken }, userInfo } = res;
        store.dispatch('SetToken', accessToken);
        store.dispatch('SetUserinfo', userInfo);
        nextTick(() => router.push('/'));
      }).catch((err) => {
        console.log(err);
        state.loading = false;
      });
    }
  });
  // getRoutes();
  // promiseAll();
};

const promiseAll = () => {
  Promise.all([http.getRoutes(), http.getUserAuth()]).then((res) => {
    console.log(res);
    const routes = res[0];
    const auth = res[1];
  }).catch(() => {
    console.log('用户权限获取失败，请重新登录');
  });
};

const getRoutes = () => {
  http.getRoutes().then((res) => {
    console.log(res);
  });
};

const getUserAuth = (userId) => {
  http.getUserMenus({ userId }).then((res) => {
    console.log(res);
    nextTick(() => router.push('/'));
  });
};

const handleEnv = () => {
  if (import.meta.env.DEV) {
    const mock = window.YN_ADMIN_MOCK;
    ElMessageBox.confirm(`当前数据源：${mock ? 'mock数据' : '后端数据'}，是否切换数据源？`, '切换数据源', {
      confirmButtonText: '切换',
      cancelButtonText: '取消',
    }).then(() => {
      window.YN_ADMIN_MOCK = !mock;
      ElMessage.success(`数据源已切换为：${mock ? '后端数据' : 'mock数据'}`);
    }).catch(() => {
      ElMessage.info('已取消操作');
    });
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  background: {
    color: rgba(0, 0, 0, 0.2);
    image: url('@/assets/images/lockLogin.png');
    size: cover;
  };
  background-blend-mode: multiply;
}
.login-info {
  margin-top: 150px;
  color: #fff;
  align-self: flex-start;
  &-list {
    margin: 20px 30px;
    font-size: 14px;
    list-style-type: disc;
  }
}
.login-form {
  width: 370px;
  border-radius: 6px;
}
.msg-text {
  display: block;
  width: 60px;
  font-size: 12px;
  line-height: 24px;
  text-align: center;
  cursor: pointer;
  &.disabled {
    color: #ccc;
  }
}
.login-submit {
  width: 100%;
}
:deep(.login-text-btn) {
  color: #999;
  cursor: pointer;
  &:hover {
    color: #409EFF;
  }
}
</style>
