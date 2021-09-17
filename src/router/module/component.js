import Layout from '@com/layout/index.vue';

export default {
  path: '/component',
  component: Layout,
  meta: { title: '组件', icon: 'el-icon-files' },
  redirect: '/component/search',
  children: [
    {
      path: 'search',
      name: 'Search',
      meta: { title: '搜索工具' },
      component: () => import('@vws/component/search.vue'),
    },
    {
      path: 'table',
      name: 'Table',
      meta: { title: '表格' },
      component: () => import('@vws/component/table.vue'),
    },
  ],
};
