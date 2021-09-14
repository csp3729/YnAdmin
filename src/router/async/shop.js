import { LAYOUT } from '@uts';

export default {
  path: '/shop',
  component: LAYOUT,
  meta: { title: '商铺管理', code: '0200', icon: 'el-icon-s-shop' },
  redirect: '/shop/list',
  children: [
    {
      path: 'list',
      name: 'ShopList',
      meta: { title: '店铺列表', code: '0201' },
      component: () => import('@vws/common/module/index.vue'),
    },
    {
      path: 'setting',
      name: 'ShopSetting',
      meta: { title: '店铺管理', code: '0202' },
      component: () => import('@vws/common/module/index.vue'),
    },
    {
      path: 'category',
      name: 'ShopCategory',
      meta: { title: '主营类目', code: '0204' },
      component: () => import('@vws/common/module/index.vue'),
    },
    {
      path: 'store',
      name: 'ShopStore',
      meta: { title: '门店列表', code: '0203' },
      component: () => import('@vws/common/module/index.vue'),
    },
  ],
};
