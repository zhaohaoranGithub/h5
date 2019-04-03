import * as apiService from '@/services/api.js';
import Fingerprint from '@/vendor/scripts/fingerprint';


/**
 * 用户登录接口
 * @param username 用户名
 * @param password 密码
 * @param code
 * @param imgCode
 * @return {Promise<*[]>}
 */
const loginApi = async ({username, password, code = '', imgCode = ''}) => {
  let uuid;
  if (imgCode) {
    uuid = new Fingerprint().get();
  }
  const [result, data] = await apiService.post(api.USER_LOGIN_USERNAME, {
    username,
    password,
    code,
    imgCode,
    uuid,
  });

  return [result, data];
};

/**
 * 手机快捷登录
 * @param mobile
 * @param code
 * @returns {Promise<*[]>}
 */
const mobileLoginApi = async ({mobile, code, telArea}) => {
  const [result, data] = await apiService.post(api.USER_LOGIN_MOBILE, {
    mobile,
    code,
    telArea
  });

  return [result, data];
};

/**
 * 获取快捷登录密码
 * @param mobile
 * @returns {Promise<*[]>}
 */
const getMobileLoginCodeApi = async ({mobile, telArea}) => {
  const [result, data] = await apiService.post(api.GET_USER_LOGIN_MOBILE, {
    mobile,
    telArea
  });

  return [result, data];
};

/**
 * 用户登录接口
 * @return {Promise<*[]>}
 */
const loginOutApi = async () => {
  const [result, data] = await apiService.post(api.USER_LOGOUT);

  return [result, data];
};

/**
 * 获取手机注册验证码
 * @param mobile
 * @returns {Promise<*[]>}
 */
const getMobileRegisterCodeApi = async ({mobile}) => {
  const [result, data] = await apiService.post(api.USER_REGISTER_MOBILE_GET, {
    mobile
  });

  return [result, data];
};

/**
 * 手机注册验证
 * @param mobile
 * @returns {Promise<*[]>}
 */
const mobileRegisterCodeCheckApi = async ({mobile, code}) => {
  const [result, data] = await apiService.post(api.USER_REGISTER_MOBILE_CHECK, {
    mobile,
    code
  });

  return [result, data];
};

/**
 * 用户手机注册接口
 * @return {Promise<*[]>}
 */
const mobileRegisterApi = async ({mobile, code, password}) => {
  const [result, data] = await apiService.post(api.USER_REGISTER_MOBILE, {
    mobile,
    code,
    password
  });

  return [result, data];
};

/**
 * 用户密码注册
 * @param username
 * @param password
 * @param imgCode
 * @returns {Promise<*[]>}
 * @param uuid
 */
const registerApi = async ({username, password, imgCode, uuid}) => {
  const [result, data] = await apiService.post(api.USER_REGISTER, {
    username,
    password,
    imgCode,
    uuid,
  });

  return [result, data];
};

/**
 * 检查昵称是否存在
 * @param nickName
 * @returns {Promise<*[]>}
 */
const nicknameCheckApi = async ({nickName}) => {
  const [result, data] = await apiService.post(api.USER_NICKNAME_CHECK, {
    nickName,
    nickname: nickName
  });

  return [result, data];
};

/**
 * 设置昵称
 * @param nickName
 * @returns {Promise<*[]>}
 */
const nicknameApi = async ({nickName}) => {
  const [result, data] = await apiService.post(api.USER_NICKNAME, {
    nickName,
  });

  return [result, data];
};


/**
 * 用户密码
 * @param oldPwd
 * @param newPwd
 * @returns {Promise<*[]>}
 */
const passwordUpdateApi = async ({oldPwd, newPwd}) => {
  const [result, data] = await apiService.post(api.USER_UPDATE_PASSWORD, {
    oldPwd,
    newPwd,
  });

  return [result, data];
};

/**
 * 检查用户是否开启密码保护验证
 * @param username
 * @returns {Promise<*[]>}
 * 没有使用
 */
const userLoginSecurity = async ({username}) => {
  const [result, data] = await apiService.post(api.USER_LOGIN_SECURITY, {
    username,
  });

  return [result, data];
};

/**
 * 获取登录手机验证码
 * @param username
 * @returns {Promise<*>}
 */
const sendMobileLoginCode = async ({mobile}) => {
  return apiService.post(api.SEND_MOBILE_LOGIN_CODE, {
    mobile
  });
};

//忘记密码相关

/**
 * 找回密码时获取绑定信息
 * @param mobile
 * 找回方式，mobile为手机，email为邮箱
 * @returns {Promise<*>}
 */
const getUserForgetInfoApi = async ({username, code, uuid = new Fingerprint().get()}) => {
  return apiService.post(api.USER_FORGET_INFO, {
    username,
    code,
    uuid,
  });
};

/**
 * 获取找回密码验证码
 * 找回方式，mobile为手机，email为邮箱
 * @param username
 * @param type
 * @param uuid
 * @param imgCode
 * @returns {Promise<*>}
 */
const getUserForgetCodeApi = async ({username, type, uuid = new Fingerprint().get(), imgCode}) => {
  return apiService.post(api.USER_FORGET_CODE, {
    username,
    type,
    uuid,
    imgCode
  });
};

/**
 * 获取找回密码验证码
 * 找回方式，mobile为手机，email为邮箱
 * @param username
 * @param type
 * @param uuid
 * @param imgCode
 * @param code
 * @param newPwd
 * @returns {Promise<*>}
 */
const userForgetResetPasswordApi = async ({username, type, code, newPwd, uuid = new Fingerprint().get(), imgCode}) => {
  return apiService.post(api.USER_FORGET_RESET_PASSWORD, {
    username, type, code, newPwd, uuid, imgCode
  });
};


/**
 * 获取其他手机验证码
 */
const sendMobileCode = ({username, type}) => {
  return apiService.post(api.SEND_MOBILE_CODE, {
    username,
    type,
  });
};

/**
 * 获取用户信息
 * @return {Promise<*[]>}
 */
const getUserDetail = async () => {
  const [result, data] = await apiService.post(api.USER_DETAIL);

  return [result, data];
};

/**
 * 更新用户信息
 */
const saveUserDetail = async ({nickName, reallyName, birthday = '', sex = ''}) => {
  const [result, data] = await apiService.post(api.SAVE_USER_DETAIL, {
    nickName,
    reallyName,
    birthday,
    sex
  });

  return [result, data];
};


/**
 * 保存代理域名
 */
const saveAgencyUrl = async (params) => {
  const [result, data] = await apiService.post(api.SAVE_AGENCY_URL, params);

  return [result, data];
};


/**
 * 保存头像
 * @param avatar
 * @returns {Promise<*[]>}
 */
const avatarSaveApi = async ({avatar}) => {
  const [result,data] = await apiService.post(api.SAVE_USER_AVATAR, {
    avatar
  });

  return [result,data];
};

/**
 * 获取手机验证码
 * type: mobile_bind绑定手机
 */
const getValidateCode = async(params) =>{
  const [result,data] = await apiService.post(api.USER_MOBILE_CODE,params);
  return [result,data];
};
/**
 * 手机短信验证
 * type: mobile_bind绑定手机
 */
const bindUserMobile = async({mobile = '', type, code, telArea}) =>{
  const [result,data] = await apiService.post(api.USER_MOBILE_VALIDATE, {
    mobile,
    type,
    code,
    telArea
  });
  return [result,data];
};

/**
 * 获取邮箱验证码
 */
const getEmailValidateCode = async(params) =>{
  const [result,data] = await apiService.post(api.USER_EMAIL_CODE,params);
  return [result,data];
};
/**
 * 绑定手机
 * type: mobile_bind绑定手机
 */
const bindUserEmail= async(params) =>{
  const [result,data] = await apiService.post(api.USER_EMAIL_VALIDATE,params);
  return [result,data];
};

/**
 * 银行卡列表
 * @returns {Promise<*[]>}
 */
const bankListApi = async() => {
  const [result,data] = await apiService.post(api.USER_BANK_CARD_LIST);
  return [result,data];
};

/**
 * 银行卡绑定
 * @returns {Promise<*[]>}
 */
const bankListBindApi = async(params) => {
  const [result,data] = await apiService.post(api.USER_BANK_CARD_BIND, params);
  return [result,data];
};

/**
 * 银行卡验证
 * @param params
 * @returns {Promise<*[]>}
 */
const bankValidateApi = async(params) => {
  const [result,data] = await apiService.post(api.BANK_VALIDATE, params);
  return [result,data];
};

/**
 * 删除银行卡
 * @param cardId
 * @returns {Promise<*[]>}
 */
const bankCardDeleteApi = async({
                                  cardId,
                                  code,
                                    }) => {
  const [result,data] = await apiService.post(api.USER_BANK_CARD_DELETE, {
    cardId,
    code,
  });
  return [result,data];
};

/**
 * 银行卡选中状态
 * @returns {Promise<*[]>}
 */
const bankCardUpdate = async(cardId) => {
  const [result,data] = await apiService.post(api.USER_BANK_CARD_UPDATE, {
    cardId
  });
  return [result,data];
};

/**
 * 用户安全定制信息
 * @returns {Promise<*[]>}
 */
const userSecurityInfoApi = async() => {
  const [result,data] = await apiService.post(api.USER_SECURITY_INFO);
  return [result,data];
};

/**
 * 更新用户安全定制
 * @returns {Promise<*[]>}
 */
const userSecurityUpdateApi = async({
                                      type = consts.WITHDARW,
                                      status = consts.SECURITY_OPEN,
                                      code,
                                    }) => {
  const [result,data] = await apiService.post(api.USER_SECURITY_UPDATE, {
    type,
    status,
    code
  });
  return [result,data];
};


/**
 * 用户限制
 * @param dailyRecharge
 * @param dailyTransfer
 * @param lockDays
 * @returns {Promise<*[]>}
 */
const userSecurityLimitApi = async({
                                     dailyRecharge,
                                     dailyTransfer,
                                     lockDays,
                                   }) => {

  const [result,data] = await apiService.post(api.USER_SECURITY_LIMIT, {
    dailyRecharge,
    dailyTransfer,
    lockDays
  });
  return [result,data];
};

/**
 *
 * @param params
 * @returns {Promise<*[]>}
 */
const userTransactionListApi = async(params) => {
  const {orderType} = params;
  const [result,data] = await apiService.post(api.USER_TRANSACTION_LIST,
    {
      ...params,
      orderType: orderType === -1 ? '1,2,3,4,5,5,6,8,10,11,13,14':orderType
    });
  return [result,data];
};

/**
 * 用户在线心跳维持的接口
 * @returns {Promise<*[]>}
 */
const userHeartBeatApi = async() => {
  const [result,data] = await apiService.post(api.USER_HEART_BEAT);
  return [result,data];
};

/**
 * 线路检测
 * @returns {Promise<*[]>}
 */
const systemDomainList = async() => {
  const [result,data] = await apiService.post(api.SYSTEM_DOMAIN_LIST);
  return [result,data];
};


export {
  loginApi,
  mobileLoginApi,
  getMobileLoginCodeApi,
  loginOutApi,

  getMobileRegisterCodeApi,
  mobileRegisterCodeCheckApi,
  mobileRegisterApi,

  registerApi,
  getUserForgetInfoApi,
  getUserForgetCodeApi,
  userForgetResetPasswordApi,

  nicknameCheckApi,
  nicknameApi,
  avatarSaveApi,

  getValidateCode,
  bindUserMobile,
  getUserDetail,
  sendMobileLoginCode,
  passwordUpdateApi,
  sendMobileCode,
  userLoginSecurity,
  getEmailValidateCode,
  bindUserEmail,
  saveUserDetail,
  saveAgencyUrl,
  bankListApi,
  bankListBindApi,
  bankCardUpdate,
  bankCardDeleteApi,
  bankValidateApi,
  userSecurityLimitApi,
  userSecurityInfoApi,
  userSecurityUpdateApi,
  userTransactionListApi,
  userHeartBeatApi,

  systemDomainList
};
