import { ElMessageBox } from 'element-plus';

import { router, store } from '@uts/instance';
import Layout from '@com/layout/index.vue';
import http from '@/api';

export function filterAuthRoutes(routes, auths) {
  return routes.filter((route) => {
    if (hasPermission(route, auths)) {
      if (route.children?.length) {
        route.children = filterAuthRoutes(route.children, auths);
      }
      return true;
    }
    return false;
  });
}

function hasPermission(route, auths) {
  const code = route.meta?.code;
  return code && auths.includes(code);
}

function loadRoutes(routes) {
  return routes.map((route) => {
    const { component, children } = route;
    if (component.toLocaleUpperCase() === 'LAYOUT') route.component = Layout;
    else route.component = () => import(`../views${component}.vue`);
    if (children) route.children = loadRoutes(children);
    return route;
  });
}

export default function hasUserAuth() {
  return new Promise((resolve, reject) => {
    Promise.all([http.getRoutes(), http.getUserAuth()]).then((res) => {
      const [routes = [], auth = []] = res;
      if (!auth.length) {
        ElMessageBox.alert('未检测到您的授权信息，请先联系管理员为您授权。', '提示', {
          confirmButtonText: '确定',
        });
      } else {
        const routesMap = loadRoutes(routes).concat([{ path: '/:catchAll(.*)', redirect: '/404' }]);
        routesMap.forEach((route) => router.addRoute(route));
        store.dispatch('SetUserAuth', { routes: routesMap, authRoutes: auth, authButtons: [] });
        resolve();
      }
    }).catch((err) => {
      console.log(err);
      ElMessageBox.alert('用户权限获取失败，请重新登录', '提示', {
        confirmButtonText: '确定',
        callback: () => {
          store.commit('CLEAR_USER_AUTH');
          store.commit('CLEAR_USER_LOGIN');
          router.push('/login');
        },
      });
      reject();
    });
  });
}
