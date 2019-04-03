import {
  gameListApi
} from '@/services/api/game.js';

const initState = () => {
  return [{
      name: 'AG真人',
      gameId: consts.AG_REAL,
      channelId: consts.CHANNEL_AG,
    },
    {
      name: 'AG捕鱼',
      gameId: consts.AG_FISH,
      channelId: consts.CHANNEL_AG,
    },
    {
      name: '贝博体育',
      gameId: consts.GAME_SPORTS,
      channelId: consts.CHANNEL_188,
    },
    {
      name: 'PT电子',
      gameId: consts.PT,
      channelId: consts.CHANNEL_PT,
    },
    {
      name: 'EBET真人',
      gameId: consts.EBET_REAL,
      channelId: consts.CHANNEL_EBET,
    },
    {
      name: 'LB彩票',
      gameId: consts.TICKET,
      channelId: consts.CHANNEL_TICKET,
    },
    {
      name: '欢乐棋牌',
      gameId: consts.JOY_POKER,
      channelId: consts.CHANNEL_POKER,
    },
  ];
};

const getters = {
  gameStatus: (state) => (gameId) => {
    return _.find(state, {
      gameId
    });
  }
};

// actions
const actions = {
  async [types.GET_MAINTAIN_STATUS]({
    commit
  }) {
    const [result, data] = await gameListApi();

    if (result !== false) {
      commit(types.GET_MAINTAIN_STATUS_SUCCESS, data);
    }

    return {
      result,
      data
    };
  },
};

// mutations
const mutations = {
  [types.GET_MAINTAIN_STATUS_SUCCESS](state, data) {
    // this.commit(types.UPDATE_USER_INFO, data);
    Object.assign(state, _.unionBy(data, state, 'gameId'));
  },
};

export default {
  state: initState,
  getters,
  actions,
  mutations,
};
