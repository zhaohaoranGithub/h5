import {
  activityDialogListApi
} from '@/services/api/activity';

import store from '@/store';
import lscache from 'lscache';
import Cookies from 'js-cookie';
import { debug } from 'util';

const initState = () => {
  return {
    //true 未展示过，可以展示, false 不展示
    isOpen: false,
    userCacheName: '',
    startRedPacket: false,
    isQualification: true,
    activityList: [],
  };
};

const getters = {
  globalActivityList: state => {
    return state.activityList;
  },
  isGlobalActivity: state => {
    return !!(state.isOpen && state.activityList.length);
  },
  getStartRedPacket: state => {
    return state.startRedPacket;
  },
  getQualification: state => {
    return state.isQualification;
  }
};

// actions
const actions = {
  /**
   * 取得全局弹窗活动信息
   * @param commit
   * @returns {Promise<{result: *, data: *}>}
   */
  async [types.GET_GLOBAL_ACTIVITY]({
    commit
  }) {
    const [result, data] = await activityDialogListApi();

    if (result) {
      commit(types.GET_GLOBAL_ACTIVITY_SUCCESS, data);
    }

    return {
      result,
      data
    };
  },
};

// mutations
const mutations = {
  [types.CLOSE_GLOBAL_ACTIVITY](state) {
    state.isOpen = false;
  },
  [types.GET_GLOBAL_ACTIVITY_SUCCESS](state, data) {
    state.userCacheName = `${consts.CACHE_CLOSE_TODAY_DIALOG}-${store.state.user.id}`;
    // const isOpenedToday = !!lscache.get(state.userCacheName);
    const isOpenedToday = !!Cookies.get(state.userCacheName);

    state.activityList = data;

    if (!isOpenedToday) {
      let curDate=new Date();
      let curTamp=curDate.getTime();
      let curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1;
      let passedTamp = curTamp - curWeeHours;
      let leftTamp = 24 * 60 * 60 * 1000 - passedTamp;
      const leftTime = new Date();
      leftTime.setTime(leftTamp + curTamp);
      state.isOpen = true;
      // lscache.set(state.userCacheName, true, 60 * 24);
      document.cookie = state.userCacheName + "=" + true+ ";expires=" + leftTime.toGMTString();
      // Cookies.set(state.userCacheName, true,{
      //   expires: moment(leftTime,'m'),
      // });
    }
  },
  [types.LOGOUT](state) {
    Object.assign(state, initState());
  },
  [types.START_RED_PACKET](state, data) {
    state.startRedPacket = data;
  },
  [types.START_RED_QUA](state, data) {
    state.isQualification = data;
  }
};

export default {
  state: initState,
  getters,
  actions,
  mutations,
};
