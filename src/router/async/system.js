import { LAYOUT } from '@uts';

export default {
  path: '/system',
  component: LAYOUT,
  meta: { title: '系统管理', code: '0100', icon: 'el-icon-s-tools' },
  redirect: '/system/user',
  children: [
    {
      path: 'user',
      name: 'SystemUser',
      meta: { title: '用户管理', code: '0101' },
      component: () => import('@vws/common/module/index.vue'),
    },
    {
      path: 'role',
      name: 'SystemRole',
      meta: { title: '角色管理', code: '0102' },
      component: () => import('@vws/common/module/index.vue'),
    },
    {
      path: 'authorize',
      name: 'SystemAuthorize',
      meta: { title: '权限管理', code: '0103' },
      component: () => import('@vws/common/module/index.vue'),
    },
    {
      path: 'menus',
      name: 'SystemMenus',
      meta: { title: '菜单管理', code: '0104' },
      component: () => import('@vws/common/module/index.vue'),
    },
  ],
};
