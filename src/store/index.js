import Vuex from 'vuex';
import actions from './actions';
import state from './state';
import mutations from './mutations';
import * as getters from './getters';
import balance from './modules/balance';
import user from './modules/user';
import game from './modules/game';
import global from './modules/global';
import security from './modules/security';
import notice from './modules/notice';
import activity from './modules/activity';
import announcement from './modules/announcement';
import sports from './modules/sports';
import ws from './modules/ws';

import {
  install as wsInstall
} from '@/utils/ws';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  // state,
  // mutations,
  actions,
  getters,
  modules: {
    balance,
    user,
    game,
    global,
    security,
    notice,
    activity,
    announcement,
    sports,
    ws,
  },
  strict: debug,
  state: {
    rightFilterVisibility: false,
  },
  mutations: {
    [types.RIGHT_FILTER_VISIBILITY] (state, prop){
      state.rightFilterVisibility = prop.rightFilterVisibility;
    },
  }
});

if (module.hot) {
  module.hot.accept([
    './actions',
    './getters',
    './modules/balance',
    './modules/user',
    './modules/game',
    './modules/global',
    './modules/security',
    './modules/notice',
    './modules/activity',
    './modules/announcement',
    './modules/sports',
    './modules/ws'
  ], () => {
    const actions = require('./actions').default;
    const getters = require('./getters').default;
    const state = require('./state').default;
    const mutations = require('./mutations').default;

    const balance = require('./modules/balance').default;
    const user = require('./modules/user').default;
    const game = require('./modules/game').default;
    const global = require('./modules/global').default;
    const security = require('./modules/security').default;
    const notice = require('./modules/notice').default;
    const activity = require('./modules/activity').default;
    const announcement = require('./modules/announcement').default;
    const sports = require('./modules/sports').default;
    const ws = require('./modules/ws').default;

    store.hotUpdate({
      state,
      mutations,
      actions,
      getters,
      modules: {
        balance,
        user,
        game,
        global,
        security,
        notice,
        activity,
        announcement,
        sports,
        ws,
      }
    });
  });
}

_.delay(() => {
  wsInstall(store);
});

export default store;
