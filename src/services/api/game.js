import * as apiService from '@/services/api.js';

import store from '@/store';
import Cookies from "js-cookie";


/**
 * 游戏维护状态
 * @return {Promise<*[]>}
 */
const gameListApi = async () => {
  const [result, data] = await apiService.post(api.GAME_LIST);

  return [result, data];
};

/**
 * 获取电子游戏列表
 * @return {Promise<*[]>}
 */
const subGameListApi = async ({channelId, type = -1, page = 0, size = 999}) => {
  const [result, data] = await apiService.post(api.GAME_SUB_LIST, {
    page,
    size,
    channelId,
    subType: type,
    gameType: 3
  });

  return [result, data];
};

/**
 * 游戏跳转
 * @param gameId
 * @param type 1试玩 0正式
 * @returns {Promise<*[]>}
 */
const gameJumpApi = async ({gameId, type = 0}) => {
  const [result, data] = await apiService.post(api.GAME_JUMP, {
    gameId,
    type
  });

  return [result, data];
};

/**
 * 获取用户投注信息
 * @param params
 * @returns {Promise<*[]>}
 */
const historyGameBetApi = async (params) => {
  const [result, data] = await apiService.post(api.HISTORY_GAME_BET, params);

  return [result, data];
};

/**
 * 获取用户投注汇总
 * @deprecated
 * @param params
 * @returns {Promise<*[]>}
 */
const historyGameBetCountApi = async (params) => {
  const [result, data] = await apiService.post(api.HISTORY_GAMEBET_COUNT, params);

  return [result, data];
};
/**
 * 获取用户输赢汇总
 * @param params
 * @returns {Promise<*[]>}
 */
const reportGameApi = async ({date}) => {
  const [result, data] = await apiService.post(api.GAME_BET_BY_CHANNEL, {
    // userName: store.getters.username,
    userName:  Cookies.get(consts.CACHE_USERNAME, {
      domain: _.getFirstLevelDomain({
        change: false
      })
    }),
    stime: _.result(date, '[0]'),
    etime: _.result(date, '[1]'),
  });

  return [result, data];
};

/**
 * 获取中奖记录名单
 * @param params
 * @returns {Promise<*[]>}
 */
const gameListPrize = async (params) => {
  const [result, data] = await apiService.post(api.GAME_LIST_PRIZE, params);

  return [result, data];
};

/**
 * 获取热门赛事列表接口
 * @returns {Promise<*[]>}
 */
const hotGameApi = async ({gameId = 1}) => {
  const [result, data] = await apiService.get(api.HOT_GAME_LIST, {
    gameId
  });

  return [result, data];
};

/**
 * 获取足球篮球赛事列表接口
 * @returns {Promise<*[]>}
 */
const hotSportsGameApi = async (gameId) => {
  const [result, data] = await apiService.get(api.HOT_SPORTS_GAME_LIST, {
    gameId
  });

  return [result, data];
};


export {
  historyGameBetApi,
  reportGameApi,
  historyGameBetCountApi,
  gameListApi,
  gameJumpApi,
  subGameListApi,
  gameListPrize,
  hotGameApi,
  hotSportsGameApi,
};
