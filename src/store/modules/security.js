import {userSecurityInfoApi} from '@/services/api/user.js';

const initState = () => {
  return {
    userId: -1,
    /**
     * 提现保护：0保护，1不保护
     */
    withdrawVal: consts.WITHDRAW_PROTECT_OPEN,
    /**
     * 登录保护：0保护，1不保护
     */
    loginVal: 0,
    createDate: undefined,
    mobile: '',
    email: '',
    //银行卡张数
    cardCount: 0,
    //用户提现信息
    withdrawInfo: {},
    //用户提现状态
    withdrawStatus: {},
    /**
     * 最后修改时间
     */
    lastUpdate: undefined,
    /**
     * 每日充值限制
     */
    dailyRecharge: 0,
    /**
     * 今日充值使用额度
     */
    rechargeToday: 0,
    /**
     * 每日转账限制
     */
    dailyTransfer: 0,
    /**
     * 今日转账使用额度
     */
    transferToday: 0,
    /**
     * 锁定天数
     */
    lockDays: 0,
    username: undefined,
  };
};

const getters = {
  isBindCard: state => {
    return !!state.cardCount;
  },
  isWithdrawProtect: state => {
    return state.mobile && state.withdrawVal === consts.WITHDRAW_PROTECT_OPEN ? true :false;
  },
  isBindMobile: state => {
    return !!state.mobile;
  },
  isBindEmail: state => {
    return !!state.email;
  },
  rechargeTodayRemaining: state => {
    return state.dailyRecharge - state.rechargeToday;
  },
  transferTodayRemaining: state => {
    return state.dailyTransfer - state.transferToday;
  },
  withdrawInfo: state => {
    return state.withdrawInfo;
  },
  withdrawStatus: state => {
    return state.withdrawStatus;
  },
  securityLevel: state => {
    //登录密码 必定有
    //手机验证
    //邮箱验证
    //银行卡
    //提现保护 withdrawVal
//   * 提现保护：0保护，1不保护，2资金锁定
    const total = 5;
    let currentLevel = 1;

    if (state.mobile && state.withdrawVal === 0) {
      currentLevel++;
    }

    if (state.mobile) {
      currentLevel++;
    }

    if (state.email) {
      currentLevel++;
    }
    if (state.cardCount > 0) {
      currentLevel++;
    }

    const percentage = _(currentLevel).div(total).mul(100).value();

    const levelText = percentage < 80 ? '低' : '高';

    return {
      percentage,
      text: levelText
    };
  }
};

// actions
const actions = {
  async [types.GET_SECURITY]({commit}) {
    const [result, data] = await userSecurityInfoApi();
    if (result !== false) {
      commit(types.GET_SECURITY_SUCCESS, data);
    }

    return {result, data};
  },
};

// mutations
const mutations = {
  [types.GET_SECURITY_SUCCESS](state, data) {
    Object.assign(state, data);
  },
  [types.LOGOUT](state) {
    Object.assign(state, initState());
  },
  [types.SET_WITHDRAW_INFO](state, data) {
    state.withdrawInfo = data;
  },
  [types.SET_WITHDRAW_STATUS](state, data) {
    state.withdrawStatus = data;
  }
};

export default {
  state: initState,
  getters,
  actions,
  mutations,
};
