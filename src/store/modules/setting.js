const state = {
  layout: 'lm',
  theme: '#409eff',
  headerHeight: 50,
  topMenuPlace: 'center',
  menuColor: '',
  collapsePlace: 'menu',
  collapse: false,
  unique: true,
  breadcrumb: true,
  breadPlace: 'main',
  pagingPlace: 'tr',
  footer: true,
};

function filterState(params) {
  const result = {};
  Object.keys(params).forEach((key) => {
    result[key] = (state) => state[key];
  });
  return result;
}

export default {
  state,
  getters: filterState(state),
  mutations: {
    INIT_SETTING(state, data) {
      Object.assign(state, data);
    },
    CHANGE_SETTING(state, { key, value }) {
      state[key] = value;
    },
  },
  actions: {
    InitSetting({ commit }, data) {
      commit('INIT_SETTING', data);
    },
    ChangeSetting({ commit }, data) {
      commit('CHANGE_SETTING', data);
    },
  },
};
