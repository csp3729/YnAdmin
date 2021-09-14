import fetch from '@/service/fetch';

export default {
  login: (data) => fetch({
    url: '/admin/user/login',
    data,
  }),
  logout: (data) => fetch({
    url: '/admin/user/logout',
    data,
  }),
  getRoutes: () => fetch({
    url: '/admin/app/menu',
    method: 'get',
  }),
  getUserAuth: (params) => fetch({
    url: '/admin/auth/menus',
    method: 'get',
    params,
  }),
};
