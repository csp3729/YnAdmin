import axios from 'axios';
import { ElMessage } from 'element-plus';
import { store, router } from '@uts/instance';
import { tranForm } from '@uts';

// 创建实例
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  method: 'post',
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    if (window.YN_ADMIN_MOCK) {
      config.baseURL = '/api';
    } else if (config.method === 'post' && config.data) {
      config.data = tranForm(config.data);
    }
    config.headers = {
      ...config.headers,
      Authorization: store.getters.token,
    };
    config.withCredentials = false;
    return config;
  },
  // Do something with request error
  (error) => Promise.reject(error),
);

// response拦截器
service.interceptors.response.use(
  (response) => response,
  // Do something with response error
  (error) => Promise.resolve(error),
);

// 状态校验
function checkStatus(response) {
  const { message = '', status, data } = response;
  if ([200, 304].includes(status)) {
    return data;
  }
  if (message === 'Network Error') {
    return { status: -1, message: '接口连接异常' };
  }
  if (message.includes('timeout')) {
    return { status: -100, message: '接口请求超时' };
  }
  return { status, message: `服务器返回错误，状态码:${response.status}` };
}

function fetch(config) {
  return new Promise((resolve, reject) => {
    service(config)
      .then((response) => checkStatus(response))
      .then((result) => {
        const { code, status } = result;
        if (status) {
          switch (status) {
            case 4200:
              ElMessage.warning('您的登录已超时，请重新登录');
              store.commit('CLEAR_USER_AUTH');
              store.commit('CLEAR_USER_LOGIN');
              router.push('/login');
              break;
            default:
              // 这里统一显示错误信息
              ElMessage.error(result.message);
          }
          reject(result);
        } else if (code === 200) {
          // 状态正常，直接返回data
          resolve(result.data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default fetch;
