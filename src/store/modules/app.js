export default {
  persisted: true,
  state: {
    isLock: false,
    lockPasswd: '',
  },
  mutations: {
    SET_LOCK(state, data) {
      state.isLock = !!data;
      state.lockPasswd = data;
    },
    CLEAR_LOCK(state) {
      state.isLock = false;
      state.lockPasswd = '';
    },
  },
  actions: {
    SetLock({ commit }, data) {
      commit('SET_LOCK', data);
    },
  },
};
