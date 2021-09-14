import { LAYOUT } from '@uts';

export default {
  path: '/order',
  component: LAYOUT,
  meta: { title: '订单管理', code: '0400', icon: '' },
  redirect: '/order/list',
  children: [
    {
      path: 'list',
      name: 'OrderList',
      meta: { title: '订单列表', code: '0401' },
      component: () => import('@vws/common/module/index.vue'),
    },
  ],
};
