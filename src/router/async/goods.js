import { LAYOUT } from '@uts';

export default {
  path: '/goods',
  component: LAYOUT,
  meta: { title: '商品管理', code: '0300', icon: '' },
  redirect: '/goods/list',
  children: [
    {
      path: 'list',
      name: 'GoodsList',
      meta: { title: '商品列表', code: '0303' },
      component: () => import('@vws/common/module/index.vue'),
    },
    {
      path: 'category',
      name: 'GoodsCategory',
      meta: { title: '商品分类', code: '0301' },
      component: () => import('@vws/common/module/index.vue'),
    },
    {
      path: 'type',
      name: 'GoodsType',
      meta: { title: '商品类型', code: '0304' },
      component: () => import('@vws/common/module/index.vue'),
    },
    {
      path: 'brand',
      name: 'GoodsBrand',
      meta: { title: '品牌管理', code: '0305' },
      component: () => import('@vws/common/module/index.vue'),
    },
    {
      path: 'comment',
      name: 'GoodsComment',
      meta: { title: '用户评论', code: '0306' },
      component: () => import('@vws/common/module/index.vue'),
    },
    {
      path: 'images',
      name: 'GoodsImages',
      meta: { title: '图库管理', code: '0302' },
      component: () => import('@vws/common/module/index.vue'),
    },
  ],
};
