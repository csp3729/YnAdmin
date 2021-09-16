import Layout from '@com/layout/index.vue';

export default {
  path: '/message',
  component: Layout,
  meta: { title: '消息通知', icon: 'el-icon-message' },
  redirect: '',
  children: [
    {
      path: 'notification',
      name: 'Notification',
      meta: { title: '桌面消息' },
      component: () => import('@vws/message/notification.vue'),
    },
  ],
};
