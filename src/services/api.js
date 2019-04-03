import axios from 'axios';
import {
  shim
} from 'promise.prototype.finally';
import md5 from 'blueimp-md5';
import {
  isApp,
  getLogin,
} from '@/utils/auth';
import qs from 'qs';
import store from '@/store';
import Fingerprint from '@/vendor/scripts/fingerprint';
import Toast from "@/vant/toast";
import Raven from 'raven-js';
const PROJECT_VERSION = require('../../package.json').version;

shim();

const axiosInstance = axios.create({
  baseURL: window.location.origin,
  timeout: 5000,
});

const debouncedLogout = _.debounce((data) => {
  if (data.code === code.KICK) {
    // Toast('您的账号已在别处登录');
  } else {
    // Toast(data.message);
  }
  store.dispatch(types.LOGOUT);
}, 1000);


const handleResponse = ({
                          type,
                          url,
                          data
                        },signParams) => {
  if (data.code === 1 || data.errno === 0) {
    // console.log('request api post result:', `/api${url}`, data);
    return [true, data.data];
  } else if (data && _.isEmpty(data)) {
    return [false, undefined];
  } else if (data && _.isUndefined(data.code) && !data.errno) {
    return [true, data ? data.data : undefined];
  } else if (data.code === code.EXPIRE || data.code === code.KICK) {
    //退出登录到login
    debouncedLogout(data);
    return [false, data];
  } else {
    // Toast(data.message);
    captureError(data,signParams);
    return [false, data];
  }
};

const handelError = (err) => {
  if (err.message.indexOf('Network Error') !== -1) {
    err.message = '网络异常，请检查网络是否正确。';
  }

  return [false, err];
};

export async function get(url, params = {}, options = {}) {
  params = _addCommonParams(params);

  try {
    let resp;
    if (url.indexOf('//') !== -1) {
      resp = await axiosInstance.get(url, {
        params
      });
    } else {
      resp = await axiosInstance.get(`/api${url}`, {
        params
      });
    }
    let data = resp.data;
    return handleResponse({
      type: 'get',
      url,
      data
    });
  } catch (err) {
    return handelError(err);
  }
}

export async function post(url, params = {}, options = {}) {
  let signParams;
  if (isApp()) {
    signParams = _appAddSign();
  } else {
    signParams = _addSign();
  }

  _setAxiosHeader(signParams);

  try {
    let resp;
    if (url.indexOf('//') !== -1) {
      resp = await axiosInstance.post(url, qs.stringify(params, {
        allowDots: true
      }));
    } else {
      resp = await axiosInstance.post(`/api${url}`, qs.stringify(params, {
        allowDots: true
      }));
    }

    // console.log(resp)
    let data = resp.data;

    return handleResponse({
      type: 'post',
      url,
      data
    },signParams);
  } catch (err) {
    return handelError(err);
  }
}


function _addCommonParams(params) {
  params = params ? params : {};

  return params;
}

function _addSign() {
  const timestamp = Date.parse(new Date());
  const signParams = {};
  signParams['device_id'] = new Fingerprint().get() || ('timestamp' + timestamp + Math.random());
  signParams['os_type'] = 1;
  signParams['timestamp'] = timestamp;
  signParams['version'] = PROJECT_VERSION; //取package.json中的version属性
  const urlStr = urlEncode(signParams).substr(1);
  signParams['sign'] = md5(urlStr + 'global');
  const {token, uid} = getLogin();
  // 如果登录了，就再头信息里添加id,token
  if (token) {
    signParams['token'] = token;
    signParams['uid'] = uid;
  }
  return signParams;
}

function _appAddSign() {
  const {
    device_id,
    os_type,
    token,
    version,
    uid,
  } = getLogin();
  const timestamp = Date.parse(new Date());
  const signParams = {};
  signParams['device_id'] = device_id;
  signParams['os_type'] = os_type;
  signParams['timestamp'] = timestamp;
  signParams['version'] = version;
  const urlStr = urlEncode(signParams).substr(1);
  signParams['sign'] = md5(urlStr + 'global');
  signParams['token'] = token;
  signParams['uid'] = uid;

  return signParams;
}

function _setAxiosHeader(headers) {
  delete axios.defaults.headers.common.uid;
  delete axios.defaults.headers.common.token;
  const axiosCommom = axios.defaults.headers.common || {};
  axios.defaults.headers.common = Object.assign(axiosCommom, headers);
}

function urlEncode(param, key, encode) {
  if (param == null) return '';
  var paramStr = '';
  var t = typeof (param);
  if (t == 'string' || t == 'number' || t == 'boolean') {
    paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
      paramStr += urlEncode(param[i], k, encode);
    }
  }
  return paramStr;
}

function captureError(data,signParams={}) {
  if (data && data.message && data.message.indexOf('签名错误') > -1) {
    let header = axios.defaults.headers.common;
    Raven.captureMessage(`签名错误时参数: 
      device_id=${header.device_id}, 
      os_type=${header.os_type}, 
      timestamp=${header.timestamp}, 
      version=${header.version}, 
      sign=${header.sign}, 
      token=${header.token}, 
      uid=${header.uid},
      device_id=${signParams.device_id}, 
      os_type=${signParams.os_type}, 
      timestamp=${signParams.timestamp}, 
      version=${signParams.version}, 
      sign=${signParams.sign}, 
      token=${signParams.token}, 
      uid=${signParams.uid}`);
  }
}
