// import * as api from '@/services/api.js';

const initState = () => {
  return {
    polyTransfer: false,
    loginIsFocus: false,

    ptBonus: 0
  };
};

const getters = {};

// actions
const actions = {
  [types.POLY_TRANSFER]({state, commit}, flag = true) {
    commit(types.POLY_TRANSFER, flag);
    return new Promise((resolve) => {
      _.delay(() => {
        resolve(true);
      }, 1000);
    });
  }
};

// mutations
const mutations = {
  [types.POLY_TRANSFER](state, flag = true) {
    state.polyTransfer = flag;
  },

  SOCKET_PT_BONUS(state, money) {
    state.ptBonus = money;
  },
};

export default {
  state: initState,
  getters,
  actions,
  mutations,
};
