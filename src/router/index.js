import { createRouter, createWebHashHistory } from 'vue-router';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';

import Layout from '@com/layout/index.vue';
import Login from '@vws/login/index.vue';
import hasUserAuth from '@uts/permission';
import store from '../store';

const constantRouterMap = [
  {
    path: '/login',
    name: 'Login',
    meta: { title: '登录页' },
    component: Login,
  },
  {
    path: '/lock',
    name: 'Lock',
    meta: { title: '锁屏页' },
    component: () => import('@vws/common/lock/index.vue'),
  },
  {
    path: '/404',
    name: '404',
    meta: { title: '页面不存在' },
    component: () => import('@vws/common/error/404.vue'),
  },
  {
    path: '/401',
    name: '401',
    meta: { title: '无权限' },
    component: () => import('@vws/common/error/401.vue'),
  },
  {
    path: '/',
    component: Layout,
    meta: { title: '主控面板', icon: 'el-icon-set-up' },
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@vws/dashboard/index.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
});

const white = ['Dashboard', '401', '404'];

// router.beforeEach(async (to, from, next) => {
//   NProgress.start();
//   const { token, isLock, authRoutes } = store.getters;
//   await (async function () {
//     if (token) {
//       if (isLock && to.name !== 'Lock') next('/lock');
//       else if ((!isLock && to.name === 'Lock') || to.name === 'Login') next('/');
//       else if (authRoutes.length === 0) {
//         if (white.includes(to.name)) {
//           hasUserAuth();
//           next();
//         } else {
//           await hasUserAuth().then(() => {
//             next({ ...to, replace: true });
//           });
//         }
//       } else next();
//     } else if (to.name !== 'Login') next('/login');
//     else next();
//   }());
//   NProgress.done();
// });

router.beforeEach(async (to, from) => {
  NProgress.start();
  const { token, isLock, authRoutes } = store.getters;
  const path = await (function () {
    if (token) {
      if (isLock && to.name !== 'Lock') return { name: 'Lock' };
      if ((!isLock && to.name === 'Lock') || to.name === 'Login') return { path: '/' };
      if (!authRoutes) return hasUserAuth().then(() => to.fullPath);
      // if (white.includes(to.name)) {
      //   hasUserAuth();
      //   return true;
      // }
      if (white.includes(to.name)) return true;
      if (!authRoutes.includes(to.meta.code)) return { name: '401' };
      return true;
    } if (to.name !== 'Login') {
      return { name: 'Login' };
    }
    return true;
  }());
  NProgress.done();
  return path;
});

export { constantRouterMap };

export default router;
