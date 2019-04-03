import * as validator from './validator';

const createUsername = ({
                          emptyMessage = '请输入账户名',
                          lengthMessage = '用户名长度必须在6到16个字符之间',
                          alphaMessage = '用户名必须以字母开头，只能包含英文字母、数字'
                        }) => {
  return [
    {required: true, message: emptyMessage},
    {pattern: /^[a-zA-Z][a-zA-Z\d]*$/, message: alphaMessage},
    {min: 6, max: 16, message: lengthMessage},
  ];
};

const createRealName = ({
                          required = false,
                          emptyMessage = '请输入姓名',
                        } = {}) => {
  return [
    {required: required, message: emptyMessage},
    {validator: validator.createChCharacters()},
    {validator: validator.createMaxChCharacters({length: 16, message: '姓名长度必须小于16个字符'})},
  ];
};

const createMobile = () => {
  return [
    {required: true, message: '手机号码为必填'},
    {validator: validator.createMobile() }
  ];
};

const createUsernameOrMobile = ({
                                  emptyMessage = '请输入账户名或手机号码',
                                  lengthMessage = '请输入正确的账户名或手机号码'
                                }) => {
  return [
    {required: true, message: emptyMessage},
    {min: 6, max: 16, message: lengthMessage}
  ];
};

const createBirthday = () => {
  return [
    {validator: validator.createDate()}
  ];
};

const createNickName = ({
  required = false
                        }) => {
  return [
    {required: required, message: '昵称不能为空'},
    {validator: validator.createMaxChCharacters({length: 16, minLength: 4, message: '昵称长度必须大于4个字符小于16个字符'})},
  ];
};

const createPassword = ({
                          emptyMessage = '密码不能为空',
                          alphaMessage = '密码长度在8到20个字符，至少包含“数字/字母/特殊字符”的2种组合',
                        }) => {
  return [
    {required: true, message: emptyMessage},
    {pattern: /^(?!\d+$)(?![A-Z]+$)(?![a-z]+$)(?![`~!@#$%^&*()-=_+[]\{}|;:”,\.\/<>\?]+$)\S{8,20}$/, message: alphaMessage},
  ];
};

const createUri = () => {
  return [
    {validator: validator.createUri()}
  ];
};

const createCardNumber = () => {
  return [
    {required: true, message: '银行卡卡号不能为空'},
    {validator: validator.createCardNumber()}
  ];
};

const createRate = () => {
  return [
    {required: true, message: '利率必须填写'},
    {type: 'number', message: '必须填写数字'},
    {type: 'number', min: 0, max: 100, message: '必须在0到100之间'}
  ];
};
const createPercent = () => {
  return [
    {required: true, message: '比例必须填写'},
    {type: 'number', message: '必须填写数字'},
    {type: 'number', min: 0, max: 100, message: '必须在0到100之间'}
  ];
};
const createMoney = () => {
  return [
    {required: true, message: '金额必须填写', trigger: 'blur'},
    {type: 'number', min: 1, message: '必须填写大于0的正整数', trigger: 'blur'},
    {validator: validator.createNonNegativeInteger()}
  ];
};
const createTimes = () => {
  return [
    {required: true, message: '次数必须填写'},
    {type: 'number', message: '必须填写数字'},
    {validator: validator.createNonNegativeInteger()}
  ];
};
const createMoneyType = () => {
  return [
    {type: 'number', message: '必须填写数字'},
    {validator: validator.createNonNegativeInteger()}
  ];
};

export {
  createUsername,
  createRealName,
  createNickName,
  createBirthday,
  createUsernameOrMobile,
  createPassword,
  createUri,
  createCardNumber,
  createRate,
  createMoney,
  createMoneyType,
  createTimes,
  createPercent,
  createMobile,
};
