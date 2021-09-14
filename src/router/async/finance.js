import { LAYOUT } from '@uts';

export default {
  path: '/finance',
  component: LAYOUT,
  meta: { title: '财务管理', code: '0500', icon: '' },
  redirect: '/finance/payment',
  children: [
    {
      path: 'payment',
      name: 'FinancePayment',
      meta: { title: '支付管理', code: '0501' },
      component: () => import('@vws/common/module/index.vue'),
    },
    {
      path: 'settlement',
      name: 'FinanceSettlement',
      meta: { title: '结算列表', code: '0502' },
      component: () => import('@vws/common/module/index.vue'),
    },
    {
      path: 'capital',
      name: 'FinanceCapital',
      meta: { title: '资金管理', code: '0503' },
      component: () => import('@vws/common/module/index.vue'),
    },
    {
      path: 'withdrawal',
      name: 'FinanceWithdrawal',
      meta: { title: '提现记录', code: '0504' },
      component: () => import('@vws/common/module/index.vue'),
    },
    {
      path: 'refund',
      name: 'FinanceRefund',
      meta: { title: '退款记录', code: '0505' },
      component: () => import('@vws/common/module/index.vue'),
    },
    {
      path: 'order',
      name: 'FinanceOrder',
      meta: { title: '订单统计', code: '0506' },
      component: () => import('@vws/common/module/index.vue'),
    },
    {
      path: 'sale',
      name: 'FinanceSale',
      meta: { title: '销售统计', code: '0507' },
      component: () => import('@vws/common/module/index.vue'),
    },
  ],
};
