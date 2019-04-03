import {userNoticeNewApi} from '@/services/api/notice';
import Notify from 'vant/notify';
import lscache from 'lscache';

const initState = () => {
  return {
    isNoticeToday: !lscache.get(consts.CACHE_CLOSE_TODAY_NOTICE),
    // noticeList: [
    //   {
    //     mainTitle: '提现成功',
    //     title: '恭喜您于2018.09.09 14:34:55分成功提现5000.00元，请查收.'
    //   },
    //   {
    //     mainTitle: '充值成功',
    //     title: '您于2018.09.09 14:35:55分成功充值5000.00元 请您在中心钱包查收.'
    //   },
    //   {
    //     mainTitle: '返水到账',
    //     title: '您于2018.09.09 13:00:55分返水成功到账5000.00元 请您在中心钱包查收'
    //   },
    // ],
    noticeList: [],
  };
};

const getters = {
  noticeList: state => {
    return state.noticeList;
  },

  isNotice: state => {
    // return true;
    return state.isNoticeToday && state.noticeList.length;
  }
};

// actions
const actions = {
  async [types.GET_NEW_NOTICE]({commit}) {
    const [result, data] = await userNoticeNewApi();

    if (result) {
      commit(types.GET_NEW_NOTICE_SUCCESS, data);
    }

    return {result, data};
  },
};

// mutations
const mutations = {
  SOCKET_NOTICE_CHARGE (state, data) {
    if (data.type === consts.NOTICE_CHARGE) {
      // data.mainTitle = '存款成功';
      // state.noticeList = _.unionBy(state.noticeList, [data], 'title');
      //
      // this.dispatch(types.OAUTH);
      Notify({type: 'success', message: data.title});
    }
  },
  SOCKET_NOTICE_WITHDRAW (state, data) {
    if (data.type === consts.NOTICE_WITHDRAW) {
      // data.mainTitle = '提现成功';
      // state.noticeList = _.unionBy(state.noticeList, [data], 'title');
      //
      // this.dispatch(types.OAUTH);
      Notify({type: 'success', message: data.title});
    }
  },
  SOCKET_UP_AMOUNT_SUCCESS (state, data) {
    if (data.type === consts.NOTICE_UP_AMOUNT_SUCCESS) {
      Notify({type: 'success', message: data.title});
    }
  },
  SOCKET_TRANSFER_FAILED (state, data) {
    if (data.type === consts.NOTICE_TRANSFER_FAILED) {
      Notify({type: 'error', message: data.title});
    }
  },
  // [types.GET_NEW_NOTICE_SUCCESS](state, data) {
  //   //有数据则合并、无数据则无视
  //   if (data.length) {
  //     _.each(data, info => {
  //       if (info.type === consts.NOTICE_CHARGE) {
  //         info.mainTitle = '存款成功';
  //       } else if (info.type === consts.NOTICE_WITHDRAW) {
  //         info.mainTitle = '提现成功';
  //       } else {
  //         info.mainTitle = '返水到账';
  //       }
  //     });
  //
  //     state.noticeList = _.unionBy(state.noticeList, data, 'noticeId');
  //   }
  // },

  [types.CLOSE_TODAY_NOTICE](state) {
    lscache.set(consts.CACHE_CLOSE_TODAY_NOTICE, true, 60 * 24);
    state.isNoticeToday = false;
  },

  [types.CLEAR_NOTICE](state) {
    state.noticeList = [];
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
