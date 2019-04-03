import * as apiService from '@/services/api.js';
import sha1 from 'sha1';
import md5 from 'blueimp-md5';

/**
 * 赛事动画列表
 */
const sportsListApi = async() => {
  const [result, data] = await apiService.get(`//${consts.PROXY_ADDRESS}.${_.getFirstLevelDomain()}/spscores`);
  // const [result, data] = await apiService.get(api.SPORTS_LIVE);

  return [result, data];
};

/**
 * 赛事视频接口
 */
const sportsVideoApi = async({type = 'm3u8'}) => {

  const [result, data] = await apiService.get(`//${consts.PROXY_ADDRESS}.${_.getFirstLevelDomain()}/video`);
  return [result, data];
};


/**
 * 当天赛事
 * @return {Promise<*[]>}
 */
const todayApi = async() => {
  const [result, data] = await apiService.get(api.SPORTS_TODAY);

  return [result, data];
};

/**
 * 出场阵容
 * @param matchId
 * @returns {Promise<*[]>}
 */
const lineupApi = async({matchId = undefined}) => {
  const [result, data] = await apiService.get(api.SPORTS_LINEUP, {
    // ID: matchId
  });

  return [result, data];
};

/**
 * 经过内部的足球赛程数据 和篮球赛程数据
 */
const matchListApi = async ({
                              gameId,
                              startTime = _.toTime(moment().add(-12, 'hours')),
                              endTime = _.toTime(moment().add(24, 'hours')),
                              is188 = 1,
                              order = 'time',
                              sort = 'desc'
}) => {
  const [result, data] = await apiService.get(api.SPORTS_MATCH_LIST, {
    gameId,
    startTime,
    endTime,
    is188,
    order,
    sort
  });

  return [result, data];
};

/**
 * 足球赛程数据
 */
const footballScsgApi = async ({time}) => {
  const [result, data] = await apiService.get(api.SPORTS_SCSG, {
    timestamp: moment().add(time[0], time[1]).format('YYYY-MM-DD')
  });

  return [result, data];
};

/**
 * 篮球赛程数据
 */
const basketballScsgApi = async ({time}) => {
  const [result, data] = await apiService.get(api.SPORTS_BASKETBALL_SCSG, {
    time: moment().add(time[0], time[1]).format('YYYY-MM-DD')
  });

  return [result, data];
};

/**
 * 伤员停赛
 * @param matchId
 * @returns {Promise<*[]>}
 */
const injuryApi = async({matchId = undefined}) => {
  const [result, data] = await apiService.get(api.SPORTS_INJURY, {
  });

  return [result, data];
};


export {
  sportsListApi,
  sportsVideoApi,
  lineupApi,
  injuryApi,
  matchListApi,
  footballScsgApi,
  basketballScsgApi,
};