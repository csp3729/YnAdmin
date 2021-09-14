const { api, mock } = require('apite');

api.post('/admin/user/login', ({ post }) => {
  const data = {
    accessToken: { accessToken: 'userToken' },
    userInfo: { userId: '1234' },
  };
  data.userInfo.userName = post.account === 'admin' ? 'admin' : '大能手';
  return { code: 200, status: 0, data };
});

api.get('/admin/user/logout', (ctx) => {
  console.log(ctx);
  return {
    code: 200,
    status: 0,
    data: { message: '退出成功' },
  };
});
