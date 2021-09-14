export default {
  persisted: true,
  state: {
    userinfo: {},
    token: '',
  },
  mutations: {
    SET_USERINFO(state, data) {
      state.userinfo = data;
    },
    SET_TOKEN(state, data) {
      state.token = data;
    },
    CLEAR_USER_LOGIN(state) {
      state.userinfo = {};
      state.token = '';
    },
  },
  actions: {
    SetUserinfo({ commit }, data) {
      commit('SET_USERINFO', data);
    },
    SetToken({ commit }, data) {
      commit('SET_TOKEN', data);
    },
  },
};
