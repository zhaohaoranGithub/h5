import * as apiService from '@/services/api.js';
import api from '@/consts/api';


/**
 * 全局活动弹窗
 * @returns {Promise<*[]>}
 */
export const activityDialogListApi = async () => {

  const [result, data] = await apiService.post(api.GLOBAL_DIALOG_LIST);

  return [result, data];
};

/**
 * 优惠活动列表
 * @return {Promise<*[]>}
 */
export const activityListApi = async (cActType) => {
  const [result, data] = await apiService.post(api.ACTIVITY_LIST, {
    actType: cActType
  });

  return [result, data];
};

/**
 * 首页活动列表
 * @returns {Promise<*[]>}
 */
export const activityAllList = async () => {

  const [result, data] = await apiService.post(api.ALL_ACTIVITY_LIST);

  return [result, data];
};


/**
 * 返水活动
 * @returns {Promise<*[]>}
 */
export const activityPlatformInfoApi = async () => {

  const [result, data] = await apiService.post(api.ACTIVITY_PLATFORM_INFO);

  return [result, data];
};
//体育闯关活动
/**
 * 查询领奖记录
 * @returns {Promise<*[]>}
 */
export const activitySportsListApi = async (
  page = 1,
  size = 10
) => {

  const [result, data] = await apiService.post(api.ACTIVITY_SPORTS_LIST, {
    page,
    size
  });

  return [result, data];
};
/**
 * 领取活动奖励
 * @returns {Promise<*[]>}
 */
export const activitySportsAwardApi = async () => {

  const [result, data] = await apiService.post(api.ACTIVITY_SPORTS_AWARD);

  return [result, data];
};
/**
 * 查询活动信息
 * @returns {Promise<*[]>}
 */
export const activitySportsInfoApi = async () => {

  const [result, data] = await apiService.post(api.ACTIVITY_SPORTS_INFO);

  return [result, data];
};

//首充活动

/**
 * 查询活动信息
 * @returns {Promise<*[]>}
 */
export const activityRechargeInfoApi = async () => {

  const [result, data] = await apiService.post(api.ACTIVITY_RECHARGE_INFO);

  return [result, data];
};
/**
 * 领取活动奖励
 * @returns {Promise<*[]>}
 */
export const activityRechargeAwardApi = async () => {

  const [result, data] = await apiService.post(api.ACTIVITY_RECHARGE_AWARD);

  return [result, data];
};


//真人连赢活动
/**
 * 查询领奖记录
 * @returns {Promise<*[]>}
 */
export const activityWinListApi = async ({
                                           page = 1,
                                           size = 10
                                         }) => {

  const [result, data] = await apiService.post(api.ACTIVITY_WIN_LIST, {
    page,
    size
  });

  return [result, data];
};
/**
 * 领取活动奖励
 * @returns {Promise<*[]>}
 */
export const activityWinAwardApi = async () => {

  const [result, data] = await apiService.post(api.ACTIVITY_WIN_AWARD);

  return [result, data];
};
/**
 * 查询活动信息
 * @returns {Promise<*[]>}
 */
export const activityWinInfoApi = async () => {

  const [result, data] = await apiService.post(api.ACTIVITY_WIN_INFO);

  return [result, data];
};


//老虎机救援活动

/**
 * 查询领奖记录
 * @returns {Promise<*[]>}
 */
export const activityRescueListApi = async ({
                                              page = 1,
                                              size = 10
                                            }) => {

  const [result, data] = await apiService.post(api.ACTIVITY_RESCUE_LIST, {
    page,
    size
  });

  return [result, data];
};
/**
 * 领取活动奖励
 * @returns {Promise<*[]>}
 */
export const activityRescueAwardApi = async () => {

  const [result, data] = await apiService.post(api.ACTIVITY_RESCUE_AWARD);

  return [result, data];
};
/**
 * 查询活动信息
 * @returns {Promise<*[]>}
 */
export const activityRescueInfoApi = async () => {

  const [result, data] = await apiService.post(api.ACTIVITY_RESCUE_INFO);

  return [result, data];
};


//-------------真人闯关活动-------------
/**
 * 领取活动奖励
 * @returns {Promise<*[]>}
 */
export const activityRealOvercomeAwardApi = async (level = null) => {
  const [result, data] = await apiService.post(api.ACTIVITY_REAL_OVERCOME_AWARD, {
    level
  });

  return [result, data];
};
/**
 * 查询活动信息
 * @returns {Promise<*[]>}
 */
export const activityRealOvercomeInfoApi = async () => {

  const [result, data] = await apiService.post(api.ACTIVITY_REAL_OVERCOME_LIST);

  return [result, data];
};

/**
 * 红包雨活动配置信息
 * @returns {Promise<*[]>}
 */
export const activityRedPacketConfigApi = async () => {

  const [result, data] = await apiService.post(api.ACTIVITY_RED_PACKET_CONFIG);

  return [result, data];
};


/**
 * 红包雨查询活动信息
 * @returns {Promise<*[]>}
 */
export const activityRedPacketInfoApi = async () => {

  const [result, data] = await apiService.post(api.ACTIVITY_RED_PACKET_INFO);

  return [result, data];
};

/**
 * 红包雨领取
 * @returns {Promise<*[]>}
 */
export const activityRedPacketReceiveApi = async () => {

  const [result, data] = await apiService.post(api.ACTIVITY_RED_PACKET_RECEIVE);

  return [result, data];
};

//体育充值
/**
 * 查询用户当日和昨日奖金详情
 * @returns {Promise<*[]>}
 */
const activitySportsRchargeInfoApi = async () => {

  const [result, data] = await apiService.post(api.ACTIVITY_SPORT_RECHARGE_RETURN_INFO);

  return [result, data];
};
/**
 * 查询用户当日和昨日奖金详情
 * @returns {Promise<*[]>}
 */
const activitySportsRchargeListApi = async () => {

  const [result, data] = await apiService.post(api.ACTIVITY_SPORT_RECHARGE_RETURN_LIST);

  return [result, data];
};

/**
 * 用户领取彩金
 * @returns {Promise<*[]>}
 */
const activitySportsRchargeGetAwardApi = async (params) => {

  const [result, data] = await apiService.post(api.ACTIVITY_SPORT_RECHARGE_GET_AWARD,params);

  return [result, data];
};

//砸金蛋活动
/**
 * 获取活动基本信息
 * @returns {Promise<*[]>}
 */
const activityGoldenInfoApi = async () => {
  const [result, data] = await apiService.post(api.ACTIVITY_GOLDEN_INFO);

  return [result, data];
};

/**
 * 获取所有用户中奖信息
 * @returns {Promise<*[]>}
 */
const activityGoldenHistoryListApi = async () => {
  const [result, data] = await apiService.post(api.ACTIVITY_GOLDEN_HISTORY_LIST);

  return [result, data];
};

/**
 * 获取当前用户中奖信息
 * @returns {Promise<*[]>}
 */
const activityGoldenMyHistoryApi = async () => {
  const [result, data] = await apiService.post(api.ACTIVITY_GOLDEN_USER_HISTORY_LIST);

  return [result, data];
};

/**
 * 获取砸金蛋结果
 * @returns {Promise<*[]>}
 */
const activityGoldenAwardApi = async (params) => {
  const [result, data] = await apiService.post(api.ACTIVITY_GOLDEN_GET_AWARD,params);

  return [result, data];
};
export {
  activitySportsRchargeInfoApi,
  activitySportsRchargeListApi,
  activitySportsRchargeGetAwardApi,
  activityGoldenInfoApi,
  activityGoldenHistoryListApi,
  activityGoldenMyHistoryApi,
  activityGoldenAwardApi,
};

