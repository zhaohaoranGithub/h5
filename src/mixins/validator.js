//factory
import Notify from 'vant/notify';
import Toast from 'vant/toast';
import store from '@/store';
/**
 * 非负整数 >= 0
 * @param emptyMessage
 * @param message
 */
const createNonNegativeInteger = (
  emptyMessage = '请输入正整数', message = '值必须大于0'
) => (value) => {

  if (_.isUndefined(value)) Notify(emptyMessage);

  const _value = Number(value);
  if (!_.isInteger(_value)) {
    Notify(emptyMessage);
  } else if (_value < 0) {
    Notify(message);
  } else {
    return true;
  }
};

/**
 * 手机号码验证
 * @param emptyMessage
 * @param message
 * @param required
 * @return {Function}
 */
const createMobile = (required=false,emptyMessage = '手机号码不能为空', message = '手机号码格式不正确') =>
  (value) => {
    let reg;
    if (_.isUndefined(value) || _.isEmpty(value)) {

      Notify(emptyMessage);
      return;
    }
    const telArea = store.getters.telArea;
    if (telArea === '+86') {
      reg = /^((1[3-9][0-9])+\d{8})$/;
    } else {
      reg = /^[0-9]*$/;
    }

    if (reg.test(value)) {
      // callback();
      return true;
    } else {
      // callback(new Error(me  ssage));
      Notify(message);

    }

  };

/**
 * 邮箱验证
 * @param emptyMessage
 * @param message
 */
const createEmail = ({
  required = true,
  emptyMessage = '',
  message = '邮箱格式不正确'
}) => (rule, value, callback) => {
  var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;

  if (_.isUndefined(value) || _.isEmpty(value)) {
    if (required == false) {
      callback();
    } else {
      callback(new Error(emptyMessage));
    }
  }

  if (!reg.test(value)) {
    callback(new Error(message));
  } else {
    callback();
  }
};

/**
 * 合法uri验证
 */
const createUri = (message = 'url格式不正确') => (rule, value, callback) => {
  if (_.isEmpty(value)) {
    callback();
  } else {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    if (!urlregex.test(value)) {
      callback(new Error(message));
    } else {
      callback();
    }
  }
};

/**
 *
 * 银行卡格式
 */
const createCardNumber = (emptyMessage = '银行卡不能为空',message = '银行卡号格式不正确') => (value) => {

  if (_.isUndefined(value) || _.isEmpty(value)) {
    Toast(emptyMessage);
    return false;
  }else {
    const pattern = /^([1-9]{1})(\d{15}|\d{16}|\d{17}|\d{18})$/;
    if (!pattern.test(value)) {
      Toast(message);
      return false;
    } else {
      return true;
    }
  }
};

/**
 *手机验证码
 */
const createMobileCode = (emptyMessage = '验证码不能为空',message = '请输入四位验证码') => (value) => {

  if (_.isUndefined(value) || _.isEmpty(value)) {
    Notify(emptyMessage);
    return false;
  }else {
    const pattern = /^([1-9]{1})(\d{3})$/;
    if (!pattern.test(value)) {
      Notify(message);
      return false;
    } else {
      return true;
    }
  }
};

/**
 * 正数 >= 0-100
 * @param emptyMessage
 * @param message
 */
const createInRangeFloat = (
  emptyMessage = '请输入数值', message = '数值范围0-100'
) => (rule, value, callback) => {
  if (_.isEmpty(value)) {
    callback();
  } else {
    if (!_.inRange(value, 100)) {
      callback(new Error(message));
    } else {
      callback();
    }
  }
};

const createDate = (
  message = '日期格式不正确'
) => (rule, value, callback) => {
  if (_.isEmpty(value)) {
    callback();
  } else {
    if (!moment(value).isValid()) {
      callback(new Error(message));
    } else {
      callback();
    }
  }
};


/**
 * 账户名
 * @returns {Boolean}
 */
const createUsername = (
  emptyMessage = '请输入账户名',
  lengthMessage = '用户名长度必须在6到16个字符之间',
  alphaMessage = '用户名为6-16个字母和数字的组合'
) => (value) => {

  // const reg = /^[a-zA-Z][a-zA-Z\d]*$/;
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
  // const reg = /^[a-zA-Z][a-zA-Z\d]{5,15}$/;
  if (_.isEmpty(value)) {
    Notify(emptyMessage);
  } else {
    if (value.length < 6 || value.length > 16) {
      Notify(lengthMessage);
    } else if (!reg.test(value)) {
      Notify(alphaMessage);
    } else {
      return true;
    }
  }
};

/**
 * 账户名
 * @returns {Boolean}
 */
const createUsernameLogin = (
  emptyMessage = '请输入账户名',
  lengthMessage = '用户名长度必须在6到16个字符之间',
  // alphaMessage = '用户名为6-16个字母和数字的组合'
) => (value) => {

  // const reg = /^[a-zA-Z][a-zA-Z\d]*$/;
  // const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
  // const reg = /^[a-zA-Z][a-zA-Z\d]{5,15}$/;
  if (_.isEmpty(value)) {
    Notify(emptyMessage);
  } else {
    if (value.length < 6 || value.length > 16) {
      Notify(lengthMessage);
    // } else if (!reg.test(value)) {
    //   Notify(alphaMessage);
    } else {
      return true;
    }
  }
};

/**
 * 密码
 * @returns {Boolean}
 */
const createPassword = (
  emptyMessage = '密码不能为空',
  alphaMessage = '密码长度在8到20个字符，至少包含“数字/字母/特殊字符”的2种组合',
) => (value) => {

  const reg = /^(?!\d+$)(?![A-Z]+$)(?![a-z]+$)(?![`~!@#$%^&*()-=_+[]\{}|;:”,\.\/<>\?]+$)\S{8,20}$/;
  if (_.isEmpty(value)) {
    Notify(emptyMessage);
  } else {
    if (!reg.test(value)) {
      Notify(alphaMessage);
    } else {
      return true;
    }
  }
};

/**
 * 账户名或手机号
 * @returns {Function}
 */
const createUsernameOrMobile = (
  emptyMessage = '请输入账户名或手机号码',
  message = '请输入正确的账户名或手机号码'
) => (value) => {
  const reg = /^1[0-9]{10}$/;

  if (_.isEmpty(value)) {

    Notify(emptyMessage);
    return;
  } else {
    if (value.length < 6 || value.length > 16) {
      Notify(message);
    } else {
      return true;
    }
  }
};

const createChCharacters = (
  emptyMessage = '请输入姓名',
  message = '请输入正确的姓名'
) => (value) => {
  const reg = /^[\u4e00-\u9fa5]/g;
  if (_.isEmpty(value)) {
    Toast(emptyMessage);
  } else {
    if (!reg.test(value)) {
      Toast(message);
    } else {
      return true;
    }
  }
};

/**
 * 最大汉字
 * @returns {Function}
 */
const createMaxChCharacters = ({
  length = 16,
  minLength = 0,
  message = '长度必须小于16个字符'
}) => (rule, value, callback) => {
  const newValue = value.replace(/[\u4e00-\u9fa5]/g, '**');

  if (_.isEmpty(newValue)) {
    callback();
  } else {
    if (newValue.length > length) {
      callback(new Error(message));
    } else if (minLength && newValue.length < minLength) {
      callback(new Error(message));
    } else {
      callback();
    }
  }
};

/*
 * 昵称
 * @returns {Boolean}
 */
const createNickName = (
  emptyMessage = '昵称不能为空',
  alphaMessage = '昵称长度必须大于4个字符小于16个字符',
) => (value) => {

  if (_.isEmpty(value)) {
    Notify(emptyMessage);
  } else {
     if (value.length < 4 || value.length > 16) {
      Notify(alphaMessage);
    } else {
      return true;
    }
  }
};
/*
 * 图片验证码
 * @returns {Boolean}
 */
const createImgCode = (
  emptyMessage = '验证码不能为空',
  alphaMessage = '验证码格式错误',
) => (value) => {

  if (_.isEmpty(value)) {
    Notify(emptyMessage);
  } else {
     if (value.length < 4) {
      Notify(alphaMessage);
    } else {
      return true;
    }
  }
};
export {
  createMobile,
  createNonNegativeInteger,
  createEmail,
  createDate,
  createUri,
  createCardNumber,
  createInRangeFloat,
  createUsernameOrMobile,
  createChCharacters,
  createMaxChCharacters,
  createUsername,
  createUsernameLogin,
  createPassword,
  createNickName,
  createImgCode,
  createMobileCode
};
