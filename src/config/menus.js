export default [
  { path: '/dashboard', meta: { title: '主控面板', icon: 'Histogram' } },
  {
    path: '/permission',
    meta: { title: '权限管理', icon: 'Operation' },
    children: [
      { path: 'allocation', meta: { title: '权限配置', icon: '' } },
    ],
  },
  {
    path: '/component',
    meta: { title: '组件', icon: 'Files' },
    children: [
      { path: 'search', meta: { title: 'search-form', icon: '' } },
      { path: 'table', meta: { title: 'table', icon: '' } },
    ],
  },
  {
    path: '',
    meta: { title: '异常页', icon: 'CircleCloseFilled' },
    children: [
      { path: '/401', meta: { title: '401' } },
      { path: '/404', meta: { title: '404' } },
    ],
  },
  {
    path: '/message',
    meta: { title: '消息通知', icon: 'Message' },
    children: [
      { path: 'notification', meta: { title: '桌面消息' } },
    ],
  },
];
