const { api, delay, mock } = require('apite');

const datas = require('./mock-data');

/* user */
require('./modules/user');

/* auth */
require('./modules/auth');

api.get('/tableData', () => ({
  code: 200,
  status: 0,
  data: mock({
    'array|30': [
      () => mock({
        name: '@name',
        'age|18-26': 1,
        'sex|1': [1, 2],
        area: '@city',
      }),
    ],
  }).array,
}));
