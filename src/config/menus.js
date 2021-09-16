export default [
  { path: '/dashboard', meta: { title: '主控面板', icon: 'el-icon-set-up' } },
  {
    path: '/permission',
    meta: { title: '权限管理', icon: 'el-icon-cpu' },
    children: [
      { path: 'allocation', meta: { title: '权限配置', icon: '' } },
    ],
  },
  {
    path: '/component',
    meta: { title: '组件', icon: 'el-icon-files' },
    children: [
      { path: 'search', meta: { title: '搜索工具', icon: '' } },
      { path: 'table', meta: { title: '表格', icon: '' } },
    ],
  },
  {
    path: '',
    meta: { title: '异常页', icon: 'el-icon-s-release' },
    children: [
      { path: '401', meta: { title: '401' } },
      { path: '404', meta: { title: '404' } },
    ],
  },
  {
    path: '/message',
    meta: { title: '消息通知', icon: 'el-icon-message' },
    children: [
      { path: 'notification', meta: { title: '桌面消息' } },
    ],
  },
];
