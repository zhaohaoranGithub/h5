import {
  mobileLoginApi,
  loginApi,
  loginOutApi,
  registerApi,
  mobileRegisterApi,
  userHeartBeatApi
} from '@/services/api/user.js';
import {checkUrlIsNoNeedCheckLogin, getLogin, logout, setLogin} from '@/utils/auth';
import router from "@/routers";

import * as ws from 'ws';

window.heartBeatTimer = undefined;

const clearHeart = () => {
  clearInterval(window.heartBeatTimer);
  window.heartBeatTimer = undefined;
};

const initState = () => {
  return {
    balance: 0,
    birthday: '',
    deviceId: 10,
    email: '',
    headUrl: '1',
    id: 0,
    nickName: '',
    place: '',
    reallyName: '',
    registerDate: undefined,
    registerIp: undefined,
    remark: '',
    sex: 1,
    status: 0,
    mobile: '',
    telephone: '',
    telArea: '+86',
    token: '',
    userRebate: 0,
    userType: 0,
    username: '',
    addressCity: "",
    addressMobile: "",
    addressName: "",
    addressProvince: "",
    addressStreet: "",
    clientType: 0,
    creditAmount: 0,
    creditStatus: 0,
    lastUpdate: undefined,
    leftAmount: 0,
    levelId: 0,
    levelName: "",
    loginIp: "",
    loginTime: null,
    logoutTime: null,
    online: null,
    parentId: 1,
    parentName: "admin",
    password: "",
    rebateName: "",
    mobileLogin: false
  };
};

const getters = {
  nickName: state => {
    return state.nickName;
  },
  username: state => {
    return state.username;
  },
  isBindReallyName: state => {
    return !!state.reallyName;
  },
  userId: state => {
    return state.id;
  },
  isLogin: state => {
    return !!state.token;
  },
  fBalance: state => {
    return _.currency(state.balance);
  },
  avatar: state => {
    return state.headUrl;
  },
  telArea: state => {
    return state.telArea;
  },
  getMobileLogin: state => {
    return state.mobileLogin;
  }
};


// actions
const actions = {
  [types.CHECK_IS_SIGNIN]({dispatch, commit}) {
    let loadUser = getLogin();
    if (loadUser.token) {
      commit(types.UPDATE_USER_INFO, {
        token: loadUser.token
      });
      dispatch(types.OAUTH);
    }
  },

  async [types.LOGIN]({commit}, params) {
    const [result, data] = await loginApi(params);
    if (result !== false) {
      commit(types.LOGIN_SUCCESS, data);
    }
    return {result, data};
  },

  async [types.MOBILE_LOGIN]({commit}, params) {
    const [result, data] = await mobileLoginApi(params);

    if (result !== false) {
      commit(types.LOGIN_SUCCESS, data);
    }
    return {result, data};
  },

  async [types.REGISTER]({commit}, params) {
    const [result, data] = await registerApi(params);

    if (result !== false) {
      commit(types.REGISTER_SUCCESS, data);
    }

    return [result, data];
  },

  async [types.REGISTER_MOBILE]({commit}, params) {
    const [result, data] = await mobileRegisterApi(params);

    if (result !== false) {
      commit(types.REGISTER_SUCCESS, data);
    }

    return [result, data];
  },

  async [types.LOGOUT]({commit}) {
    commit(types.HIDE_CTRL, true);
    const [result, data] = await loginOutApi();

    commit(types.LOGOUT);
  },

  async [types.OAUTH]({commit}) {
    const [result, data] = await userHeartBeatApi();

    if (result) {
      _.unset(data, 'token');
      commit(types.OAUTH_SUCCESS, data);
    }

    return [result, data];
  },
};

// mutations
const mutations = {
  [types.LOGIN_SUCCESS](state, data) {
    setLogin({...data, os_type: 1});//用户登陆需要设置os_type为1，用于活动页判断？
    this.commit(types.OAUTH_SUCCESS, data);
  },
  [types.REGISTER_SUCCESS](state, data) {
    setLogin({...data, os_type: 1});
    this.commit(types.UPDATE_USER_INFO, data);
  },
  [types.OAUTH_SUCCESS](state, data) {
    // state.token = data.token;
    this.commit(types.UPDATE_USER_INFO, data);

    this.dispatch(types.GET_GLOBAL_ACTIVITY);
    this.dispatch(types.GET_GLOBAL_ANNOUNCEMENT);
    this.dispatch(types.GET_GLOBAL_ANNOUNCEMENT_UNREAD);


    setLogin(state);

    if (!window.heartBeatTimer) {

      this.dispatch(types.GET_ALL_BALANCE);

      //订阅消息
      this.commit('SOCKET_SUBSCRIBE', {
        channelName: ws.NOTICE_CHARGE,
        needLogin: true,
        opts: {
          userId: state.id
        }
      });
      this.commit('SOCKET_SUBSCRIBE', {
        channelName: ws.NOTICE_WITHDRAW,
        needLogin: true,
        opts: {
          userId: state.id
        }
      });
      this.commit('SOCKET_SUBSCRIBE', {
        channelName: ws.UPDATE_BALANCE,
        needLogin: true,
        opts: {
          userId: state.id
        }
      });
      this.commit('SOCKET_SUBSCRIBE', {
        channelName: ws.UP_AMOUNT_SUCCESS,
        needLogin: true,
        opts: {
          userId: state.id
        }
      });
      this.commit('SOCKET_SUBSCRIBE', {
        channelName: ws.TRANSFER_FAILED,
        needLogin: true,
        opts: {
          userId: state.id
        }
      });

      window.heartBeatTimer = setInterval(() => {
        this.dispatch(types.GET_GLOBAL_ANNOUNCEMENT_UNREAD);
        this.dispatch(types.OAUTH);
      }, 20000);
    }
  },

  [types.UPDATE_USER_INFO](state, data) {
    if (data.telArea === '' || data.telArea === undefined) {
      data.telArea = state.telArea;
    }
    Object.assign(state, data);
  },
  [types.LOGOUT](state) {
    Object.assign(state, initState());
    clearHeart();

    this.commit('SOCKET_LOGOUT_UNSUBSCRIBE');
    logout();
    //跳转,不需要检查登陆的url不跳转到登录页
    if (!checkUrlIsNoNeedCheckLogin()) {
      router.push({name: 'login'});
    }

  },
  [types.ENTRY_START](state, entry) {
    state.entry = entry;
  },

  [types.CHANGE_ACTIVE_TAB](state, activeKey) {
    state.selectTab = activeKey;
  },

  [types.UPDATE_USER](state, user) {
    state.user = user;
  },
  [types.SET_TOKEN](state, token) {
    state.token = token;
  },
  [types.SET_TELAREA](state, data) {
    state.telArea = data;
  },
  [types.SET_MOBILELOGIN](state, data) {
    state.mobileLogin = data;
  }
};

export default {
  state: initState,
  getters,
  actions,
  mutations,
};
