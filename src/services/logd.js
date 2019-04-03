import {version} from '../../package.json';
import axios from 'axios';
import md5 from 'blueimp-md5';
import Fingerprint from '@/vendor/scripts/fingerprint';
import bowser from 'bowser';

const browser = bowser.getParser(window.navigator.userAgent);

const VISIT = 100012;       //web端访问

const axiosInstance = axios.create({
  timeout: 5000,
});

function ksort(obj){
  var keys = Object.keys(obj).sort()
    , sortedObj = {};

  for(var i in keys) {
    sortedObj[keys[i]] = obj[keys[i]];
  }

  return sortedObj;
}

export async function sendHead() {
  const signParams = _addSign();

  _setAxiosHeader(signParams);

  // await axiosInstance.head(`//mrball.com.cn`);
  let resp = await axiosInstance.head(`${api.LOGD}.${_.getFirstLevelDomain()}`);

  let data = resp.data;
}


function _addSign() {
  let signParams = [];

  //日志后台版本号
  signParams['appid'] = consts.LOGD_APPID;
  //平台类型
  signParams['platform'] = 0;
  //版本
  signParams['version'] = version;
  //客户端唯一设备id
  signParams['uuid'] = new Fingerprint().get();

  // 运营商(中国移动/联通/电信）
  // signParams['isp'] = new Fingerprint().get();
//   联网方式(wifi/4g/3g)
  // signParams['network'] = new Fingerprint().get();
  //设备型号(iphone7/xiaomi/huawei)
  signParams['device'] = `${_.result(browser.parsedResult, 'platform.type')}-${_.result(browser.parsedResult, 'platform.vendor')}`;
//   操作系统
  // signParams['os'] = new Fingerprint().get();

  // 浏览器
  signParams['browser'] = _.result(browser.parsedResult, 'browser.name');
  // 域名
  signParams['domain'] = window.location.href;
  signParams['domain_hash'] = _.result(window.location.hostname.split('.'), '0');
  // 来源
  signParams['refer'] = document.referrer || '';
  // 请求发出时的时间戳精确到毫秒
  signParams['ts'] = moment.now();
  // 事件类型id
  signParams['event'] = VISIT;
//   metrics
  signParams['metrics'] = JSON.stringify({
    ts: moment.now()
  });

  signParams = ksort(signParams);

  const urlStr = urlEncode(signParams, null, false);
  signParams['sign'] = md5(`${consts.LOGD_APP_SECRET}${urlStr}`);

  // console.log(`${consts.LOGD_APP_SECRET}${urlStr}`);

  return signParams;
}

function _setAxiosHeader(headers) {
  const axiosCommom = axios.defaults.headers.common || {};
  axios.defaults.headers.common = Object.assign(axiosCommom, headers);
}

function urlEncode(param, key, encode) {
  if (param == null) return '';
  var paramStr = '';
  var t = typeof (param);
  if (t == 'string' || t == 'number' || t == 'boolean') {
    // paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
    paramStr += key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
      paramStr += urlEncode(param[i], k, encode);
    }
  }
  return paramStr;
}
