import fetch from '@/service/fetch';

export default {
  getTableData: () => fetch({
    url: '/tableData',
    method: 'get',
  }),
};
