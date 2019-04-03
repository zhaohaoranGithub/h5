import * as apiService from '@/services/api.js';
/**
 * 网银支付 {第三方支付}
 * @return {Promise<*[]>}
 */
const rechargeNow = async(params) => {
  const [result, data] = await apiService.post(api.RECHARGE_NOW, params);

  return [result, data];
};
/**
 * 转账支付
 * @return {Promise<*[]>}
 */
const rechargeTransfer = async(params) => {
  const [result, data] = await apiService.post(api.RECHARGE_TRANSFER, params);
  return [result, data];
};
/**
 * 获取用户充值方式
 * @return {Promise<*[]>}
 */
const getRechargeList= async(params) => {
  // params.wap = 1;
  const [result, data] = await apiService.post(api.RECHARGE_LIST, params);

  return [result, data];
};
/**
 * 获取用户充值状态
 * @return {Promise<*[]>}
 */
const getRechargeStatus= async(params) => {
  const [result, data] = await apiService.post(api.RECHARGE_STATUS, params);

  return [result, data];
};
/**
 * 用户撤销充值
 * @return {Promise<*[]>}
 */
const doRechargeCancel= async(params) => {
  const [result, data] = await apiService.post(api.RECHARGE_CANCEL, params);

  return [result, data];
};
/**
 * 获取用户提现配置
 * @return {Promise<*[]>}
 */
const getWithdrawConfigs = async(params) => {
  const [result, data] = await apiService.post(api.WITHDRAW_CONFIGS, params);

  return [result, data];
};
/**
 * 用户提现状态信息
 * /gl/withdraw/info
 * @return {Promise<*[]>}
 */
const getWithdrawInfo = async(params) => {
  const [result, data] = await apiService.post(api.WITHDRAW_INFO, params);

  return [result, data];
};

/**
 * 最近一次提现状态
 * @returns {Promise<*[]>}
 */
const getWithdrawStatus = async() => {
  const [result, data] = await apiService.post(api.WITHDRAW_STATUS);

  return [result, data];
};

/**
 * 提现申请
 * @return {Promise<*[]>}
 */
const submitWithdraw = async(params) => {
  const [result, data] = await apiService.post(api.WITHDRAW_SUBMIT, params);

  return [result, data];
};
/**
 * 获取游戏钱包余额
 * @return {Promise<*[]>}
 */
const getGameBalance = async(params) => {
  const [result, data] = await apiService.post(api.GAME_BALANCE, params);
  return [result, data];
};

/**
 * 获取游戏钱包余额
 * @return {Promise<*[]>}
 */
const getChannelBalance = async({channelId}) => {
  const [result, data] = await apiService.post(api.CHANNEL_BALANCE, {
    channelId
  });
  return [result, data];
};

/**
 * 转账到钱包
 * @return {Promise<*[]>}
 * fromChannelId 转出渠道：0中心钱包
 * toChannelId  转入渠道：0中心钱包
 * amount
 * 转账金额
 * type 0(按指定金额传入，默认不传)，1(金额为转出账户最大金额)
*/
const gameTransferSync = async({fromChannelId = 0, toChannelId = 0, amount = 0, type = 1}) => {
  if (amount) {
    type = 0;
  }
  const [result, data] = await apiService.post(api.TRANSFER_SYNC, {
    fromChannelId, toChannelId, amount, type
  }); return [result, data];
};

/**
 * 转账到钱包
 * @return {Promise<*[]>}
 */
const getGameTransfer = async(params) => {
  const [result, data] = await apiService.post(api.GAME_TRANSFER, params); return [result, data];
};

export {
  rechargeNow,
  doRechargeCancel,
  getRechargeList,
  getGameBalance,
  getGameTransfer,
  gameTransferSync,
  getRechargeStatus,
  getWithdrawConfigs,
  submitWithdraw,
  getWithdrawStatus,
  getWithdrawInfo,
  rechargeTransfer,
  getChannelBalance,
};
