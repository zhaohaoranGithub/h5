import Mock from 'mockjs';
import commonApi from './common';

import rechargeApi from "./recharge";
import tradeApi from "./trade";

Mock.setup({
  timeout: '150-400'
});
const toMockUrl = (apiUrl) => {
  // console.log(apiUrl)
  try {
    // return apiUrl;
    return new RegExp(apiUrl.replace(/\//gi, '\/'));
  } catch (e) {
    console.log('Mock失败',apiUrl);
    throw e;
  }
};


/**
 * 充值相关
 */
// Mock.mock(toMockUrl(api.RECHARGE_NOW), 'post', commonApi.successOrFailure);
Mock.mock(toMockUrl(api.USER_TRADE_LIST), 'post', tradeApi[api.USER_TRADE_LIST]);
// Mock.mock(toMockUrl(api.RECHARGE_LIST), 'post', rechargeApi[api.RECHARGE_LIST]);
// Mock.mock(toMockUrl(api.GAME_MANAGER_TOGGLE_STATUS), 'post', commonApi.successOrFailure);

export default Mock;
