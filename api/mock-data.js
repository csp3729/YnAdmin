module.exports = {
  menus: [
    {
      path: '/commodity',
      name: 'Commodity',
      component: 'LAYOUT',
      redirect: '/commodity/list',
      meta: { title: '商品管理', icon: 'el-icon-s-order', code: '0100' },
      children: [
        {
          path: 'list', name: 'CommodityList', component: '/commodity/list', meta: { title: '商品列表', code: '0101' },
        },
        {
          path: 'type', name: 'CommodityType', component: '/commodity/type', meta: { title: '商品分类', code: '0102' },
        },
        {
          path: 'brand', name: 'CommodityBrand', component: '/commodity/brand', meta: { title: '品牌管理', code: '0103' },
        },
        {
          path: 'images', name: 'CommodityImages', component: '/commodity/images', meta: { title: '图库管理', code: '0104' },
        },
      ],
    },
    {
      path: '/trade',
      name: 'Trade',
      component: 'LAYOUT',
      redirect: '/trade/list',
      meta: { title: '交易管理', icon: 'el-icon-s-order', code: '0200' },
      children: [
        {
          path: 'list', name: 'TradeList', component: '/commodity/list', meta: { title: '订单列表', code: '0201' },
        },
        {
          path: 'comment', name: 'TradeComment', component: '/commodity/type', meta: { title: '用户评论', code: '0202' },
        },
      ],
    },
    {
      path: '/permission',
      name: 'Permission',
      component: 'LAYOUT',
      redirect: '/permission/role',
      meta: { title: '权限管理', icon: 'el-icon-s-order', code: '0300' },
      children: [
        {
          path: 'user', name: 'PermissionUser', component: '/permission/user', meta: { title: '帐号管理', code: '0302' },
        },
        {
          path: 'role', name: 'PermissionRole', component: '/permission/role', meta: { title: '角色管理', code: '0302' },
        },
      ],
    },
    // {
    //   title: '交易管理',
    //   icon: 'el-icon-s-order',
    //   path: '',
    //   code: '0100',
    //   children: [
    //     { title: '订单列表', path: '', code: '0101' },
    //     { title: '用户评论', path: '', code: '0102' },
    //   ],
    // },
    // {
    //   title: '店铺管理',
    //   icon: 'el-icon-place',
    //   path: '',
    //   code: '0200',
    //   children: [
    //     { title: '店铺列表', path: '', code: '0201' },
    //     { title: '门店列表', path: '', code: '0202' },
    //     { title: '营销工具', path: '', code: '0203' },
    //     { title: '营销活动', path: '', code: '0204' },
    //     { title: '已报活动', path: '', code: '0205' },
    //   ],
    // },
    // {
    //   title: '数据中心',
    //   icon: 'el-icon-place',
    //   path: '',
    //   code: '0400',
    //   children: [
    //     { title: '商品数据', path: '', code: '0401' },
    //     { title: '交易数据', path: '', code: '0402' },
    //   ],
    // },
    // {
    //   title: '财务管理',
    //   icon: 'el-icon-place',
    //   path: '',
    //   code: '0500',
    //   children: [
    //     { title: '资金中心', path: '', code: '0501' },
    //     { title: '对账查询', path: '', code: '0502' },
    //     { title: '退款记录', path: '', code: '0503' },
    //   ],
    // },
    // {
    //   title: '物流管理',
    //   icon: 'el-icon-place',
    //   path: '',
    //   code: '0600',
    //   children: [
    //     { title: '物流工具', path: '', code: '0601' },
    //   ],
    // },
    // {
    //   title: '社交营销',
    //   icon: 'el-icon-place',
    //   path: '',
    //   code: '0700',
    //   children: [
    //     { title: '直播', path: '', code: '0701' },
    //     { title: '短视频', path: '', code: '0702' },
    //   ],
    // },
    // {
    //   title: '账号管理',
    //   icon: 'el-icon-place',
    //   path: '',
    //   code: '0800',
    //   children: [
    //     { title: '个人中心', path: '', code: '0801' },
    //     { title: '', path: '', code: '0' },
    //     { title: '', path: '', code: '0' },
    //   ],
    // },
    // {
    //   title: '系统管理',
    //   icon: 'el-icon-place',
    //   path: '',
    //   code: '0900',
    //   children: [
    //     { title: '', path: '', code: '0' },
    //   ],
    // },
  ],
};
