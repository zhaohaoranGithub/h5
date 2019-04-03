import {
  systemNoticeListApi,
  systemNoticeUnreadCountApi
} from '@/services/api/notice';

const initState = () => {
  return {
    announcementList: [],
    newNoticeCount: 0,
  };
};

const getters = {
  globalAnnouncementList: state => {
    return state.announcementList;
  },
};

// actions
const actions = {
  /**
   * 取得系统公告
   * @param commit
   * @returns {Promise<{result: *, data: *}>}
   */
  async [types.GET_GLOBAL_ANNOUNCEMENT]({commit}) {
    const [result, data] = await systemNoticeListApi();

    if (result) {
      commit(types.GET_GLOBAL_ANNOUNCEMENT_SUCCESS, data);
    }

    return {result, data};
  },

  /**
   * 获取未读系统公告
   * @param commit
   * @returns {Promise<{result: *, data: *}>}
   */
  async [types.GET_GLOBAL_ANNOUNCEMENT_UNREAD]({commit}) {
    const [result, data] = await systemNoticeUnreadCountApi();

    if (result) {
      commit(types.GET_GLOBAL_ANNOUNCEMENT_UNREAD_SUCCESS, data);
    }

    return {result, data};
  },
};

// mutations
const mutations = {
  [types.GET_GLOBAL_ANNOUNCEMENT_SUCCESS](state, data) {
    state.announcementList = data.list;
  },
  [types.GET_GLOBAL_ANNOUNCEMENT_UNREAD_SUCCESS](state, data) {
    state.newNoticeCount = data;
  },
  [types.LOGOUT](state) {
    Object.assign(state, initState());
  }
};

export default {
  state: initState,
  getters,
  actions,
  mutations,
};
