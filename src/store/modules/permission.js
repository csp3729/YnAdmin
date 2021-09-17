import { constantRouterMap } from '@/router';

export default {
  state: {
    routes: constantRouterMap,
    authRoutes: null,
    authButtons: null,
  },
  mutations: {
    SET_USER_AUTH(state, { routes, authRoutes, authButtons }) {
      state.routes = state.routes.concat(routes);
      state.authRoutes = authRoutes;
      state.authButtons = authButtons;
    },
    CLEAR_USER_AUTH(state) {
      state.routes = constantRouterMap;
      state.authRoutes = null;
      state.authButtons = null;
    },
  },
  actions: {
    SetUserAuth({ commit }, data) {
      commit('SET_USER_AUTH', data);
    },
    ClearUserAuth({ commit }) {
      commit('CLEAR_USER_AUTH');
    },
  },
};
