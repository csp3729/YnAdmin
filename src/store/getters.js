export default {
  userinfo: (state) => state.user.userinfo,
  userId: ({ user }) => user.userinfo.userId,
  token: ({ user }) => user.token,
  isLock: (state) => state.app.isLock,
  routes: ({ permission }) => permission.routes,
  buttons: ({ permission }) => permission.buttons,
  authRoutes: (state) => state.permission.authRoutes,
};
