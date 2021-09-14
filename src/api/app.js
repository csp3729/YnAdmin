import fetch from '@/service/fetch';

export default {
  getTableData: () => fetch({
    baseURL: '/api',
    url: '/tableData',
    method: 'get',
  }),
};
