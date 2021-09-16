import Layout from '@com/layout/index.vue';

export default {
  path: '/permission',
  component: Layout,
  meta: { title: '权限管理', icon: 'el-icon-cpu' },
  redirect: '',
  children: [
    {
      path: 'allocation',
      name: 'Allocation',
      meta: { title: '权限配置' },
      component: () => import('@vws/permission/allocation.vue'),
    },
  ],
};
