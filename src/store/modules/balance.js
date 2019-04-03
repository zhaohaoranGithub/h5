import {
  getGameBalance,
  getChannelBalance,
  gameTransferSync,
} from '@/services/api/finance';

const initState = () => {
  return {
    visible: false,
    // visible: true,
    selectTab: 'recharge',
    channelWallet: _.map(consts.GAME_BALANCES, channelInfo => {
      return {
        ..._.clone(channelInfo),
        isOpen: false,
      };
    }),
    config: {
      transferOpen: []
    }
  };
};

const getters = {
  channelInfoBy: (state) => (obj) => {
    return _.find(state.channelWallet, obj);
  }
};

const getChannelInfo = (channelWallet, id) => {
  const channelInfo = _.find(channelWallet, {
    channelId: id
  });

  if (channelInfo) {
    return channelInfo;
  } else {
    return {
      channelName: '中心钱包',
      channelId: 0
    };
  }
};

const resolveResult = (result, data, {
  state,
  type,
  fromId = 0,
  toId = 0,
  preResults
}) => {
  let cData = {
    ...data
  };

  const fromChannelInfo = getChannelInfo(state.channelWallet, fromId);

  const toChannelInfo = getChannelInfo(state.channelWallet, toId);

  if (type === '1to1') {
    if (result) {
      cData.type = 'success';
      cData.message = `${fromChannelInfo.channelName}转账到${toChannelInfo.channelName}成功`;
    } else {
      cData.type = 'error';
      cData.message = `${fromChannelInfo.channelName}转账到${toChannelInfo.channelName}失败`;
    }
  } else if (type === 'allToPlatform') {
    //一键转账到AG钱包（转账成功/转账失败/部分失败）；

    if (result) {
      cData.type = 'success';
      cData.message = `一键转账到${toChannelInfo.channelName}转账成功`;
    } else if (!_.every(_.map(preResults, '0'), Boolean)) {
      cData.type = 'error';
      cData.message = `一键转账到${toChannelInfo.channelName}转账失败`;
    } else {
      cData.type = 'warning';
      cData.message = `一键转账到${toChannelInfo.channelName}部分失败`;
    }

    //一键回收到中心钱包（转账成功/转账失败/部分失败）
  } else if (type === 'allToCenter') {
    if (_.every(_.map(preResults, '0'), Boolean)) {
      cData.type = 'success';
      cData.message = `一键回收到中心钱包成功`;
    } else if (_.includes(_.map(preResults, '0'), true)) {
      cData.type = 'warning';
      // cData.message = `无可用游戏钱包进行回收`;
       cData.message = `一键回收到中心钱包部分成功`;
      // cData.message = `一键回收到中心钱包部分失败`;
    } else {
      cData.type = 'error';
      cData.message = `一键回收到中心钱包失败`;
    }
  }

  return [result, cData];
};

// actions
const actions = {
  [types.HIDE_CTRL]({
    commit
  }) {
    commit(types.HIDE_CTRL);
  },

  [types.TOGGLE_CTRL]({
    commit
  }) {
    commit(types.TOGGLE_CTRL);
  },

  [types.CHANGE_ACTIVE_TAB]({
    commit
  }) {
    commit(types.CHANGE_ACTIVE_TAB);
  },

  //更新所有频道余额
  async [types.GET_ALL_BALANCE]({
    dispatch
  }) {

    await dispatch(types.GET_BALANCE_STATUS);
    _.each(consts.GAME_BALANCES, channelInfo => {
      return dispatch(types.GET_BALANCE, channelInfo);
    });
  },

  //取得单个channelId
  async [types.GET_BALANCE]({
    commit
  }, {
    channelId
  }) {
    const [result, data] = await getChannelBalance({
      channelId
    });

    if (result !== false) {
      commit(types.GET_BALANCE_SUCCESS, {
        channelId,
        money: data
      });
    }

    return [result, data];
  },


  async [types.GET_BALANCE_STATUS]({
    commit
  }) {
    const [result, data] = await getGameBalance();

    if (result !== false) {
      commit(types.GET_BALANCE_STATUS_SUCCESS, data);
    }

    return [result, data];
  },

  //从中心钱包转出
  async $_transferFromCenter({
    state,
    dispatch
  }, {
    toChannelId,
    amount
  }) {
    const toChannelInfo = _.find(state.channelWallet, {
      channelId: toChannelId
    });

    return dispatch(types.TRANSFER_TO, {
      toChannelId: toChannelInfo.channelId,
      amount
    });
  },

  //从单个钱包转入中心钱包
  async $_transferToCenter({
    state,
    dispatch
  }, {
    fromChannelId,
    amount
  }) {
    return dispatch(types.TRANSFER_TO, {
      fromChannelId,
      amount
    });
  },

  //所有余额转入单个channelId
  async [types.TRANSFER_IN_CHANNEL]({
    state,
    dispatch,
    commit
  }, {
    fromChannelId = undefined,
    toChannelId = undefined,
    amount = undefined
  }) {
    //转出其他平台到中心钱包
    //1 fromId存在时 只从fromChannel转出金额
    //2 无fromId时，从所有其他钱包向目标钱包转账

    //中心钱包直接转出
    if (fromChannelId === 0) {
      const [result, data] = await dispatch('$_transferFromCenter', {
        toChannelId,
        amount
      });

      if (result) {
        dispatch(types.OAUTH);
      }

      return resolveResult(result, data, {
        type: '1to1',
        fromId: fromChannelId,
        toId: toChannelId,
        state,
      });
    }

    //转入到中心钱包
    if (!_.isUndefined(fromChannelId)) {
      const [result, data] = await dispatch('$_transferToCenter', {
        fromChannelId,
        amount
      });

      let fromResult, fromData;

      if (toChannelId) {
        [fromResult, fromData] = await dispatch('$_transferFromCenter', {
          toChannelId,
          amount
        });
      }

      if (result) {
        dispatch(types.OAUTH);
      }

      return resolveResult(result, [data, fromData], {
        type: '1to1',
        fromId: fromChannelId,
        toId: toChannelId,
        state,
      });
    }

    //转出所有开启状态的钱包的钱到中心钱包
    const allPromise = _(state.channelWallet).differenceBy([{
        channelId: toChannelId
      }], 'channelId')
      .filter({
        isOpen: true
      })
      .map(channelInfo => {
        return dispatch(types.TRANSFER_TO, {
          fromChannelId: channelInfo.channelId
        });
      })
      .value();

    // 等待转入中心钱包完成 promises，判断
    const allTransferInResult = await Promise.all(allPromise);

    //转入到指定平台
    const toChannelInfo = _.find(state.channelWallet, {
      channelId: toChannelId
    });

    if (toChannelInfo) {
      const [result, data] = await dispatch(types.TRANSFER_TO, {
        toChannelId: toChannelInfo.channelId,
        amount
      });

      if (result) {
        dispatch(types.OAUTH);
      }

      return resolveResult(result, data, {
        type: 'allToPlatform',
        fromId: fromChannelId,
        toId: toChannelId,
        preResults: allTransferInResult,
        state,
      });
    } else {
      dispatch(types.OAUTH);

      return resolveResult(true, null, {
        type: 'allToCenter',
        fromId: fromChannelId,
        toId: toChannelId,
        preResults: allTransferInResult,
        state,
      });
    }
  },

  //单对单转账
  async [types.TRANSFER_TO]({
    commit
  }, {
    fromChannelId = undefined,
    toChannelId = undefined,
    amount = undefined
  }) {
    const [result, data] = await gameTransferSync({
      fromChannelId,
      toChannelId,
      amount
    });

    return [result, data];
  }
};

// mutations
const mutations = {
  [types.GET_BALANCE_SUCCESS](state, {
    channelId,
    money
  }) {
    _.find(state.channelWallet, {
      channelId,
    }).balance = money;
  },

  [types.GET_BALANCE_STATUS_SUCCESS](state, data) {
    const {
      config
    } = data;
    state.config = config;

    const {
      transferOpen: platformStatus
    } = config;

    _.each(state.channelWallet, info => {
      const channel = _.find(platformStatus, {
        channelId: info.channelId
      });
      if (channel) {
        info.isOpen = channel.open;
      }
    });
  },

  SOCKET_UPDATE_BALANCE(state, {
    channelId,
    balance
  }) {
    this.commit(types.GET_BALANCE_SUCCESS, {
      channelId,
      money: balance
    });
  },


  [types.HIDE_CTRL](state) {
    state.visible = false;
  },
  [types.TOGGLE_CTRL](state, flag) {
    state.visible = flag;
  },
  [types.CHANGE_ACTIVE_TAB](state, activeKey) {
    state.selectTab = activeKey;
  },
};

export default {
  state: initState,
  getters,
  actions,
  mutations,
};
