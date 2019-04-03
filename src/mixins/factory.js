import * as validator from './validator';
import * as rule from './rule';

export default {
  getValidator(validatorName, params) {
    switch (validatorName) {
      case 'nonNegativeInteger':
        return validator.createNonNegativeInteger(params);
      case 'mobile':
        return validator.createMobile(params);
      case 'nickName':
        return validator.createNickName(params);
      case 'email':
        return validator.createEmail(params);
      case 'cardNumber':
        return validator.createCardNumber(params);
      case 'inRangeFloat':
        return validator.createInRangeFloat(params);
      case 'date':
        return validator.createDate(params);
      case 'usernameOrMobile':
        return validator.createUsernameOrMobile(params);
      case 'username':
        return validator.createUsername(params);
      case 'usernameLogin':
        return validator.createUsernameLogin(params);
      case 'password':
        return validator.createPassword(params);
      case 'imgcode':
        return validator.createImgCode(params);
      case 'mobilecode':
        return validator.createMobileCode(params);
      case 'zh-cn':
        return validator.createChCharacters(params);
      default:
        throw new Error(`没有找到validator${validatorName}`);
    }
  },
  getRule(ruleName, ops = {}) {
    switch (ruleName) {
      case 'username':
        return rule.createUsername(ops);
      case 'reallyName':
        return rule.createRealName(ops);
      case 'mobile':
        return rule.createMobile(ops);
      case 'usernameOrMobile':
        return rule.createUsernameOrMobile(ops);
      case 'birthday':
        return rule.createBirthday(ops);
      case 'nickName':
        return rule.createNickName(ops);
      case 'password':
        return rule.createPassword(ops);
      case 'uri':
        return rule.createUri(ops);
      case 'cardNumber':
        return rule.createCardNumber(ops);
      case 'rate':
        return rule.createRate(ops);
      case 'percent':
        return rule.createPercent(ops);
      case 'times':
        return rule.createTimes(ops);
      case 'money':
        return rule.createMoney(ops);
      case 'moneyType':
        return rule.createMoneyType(ops);
      default:
        throw new Error(`没有找到rule${ruleName}`);
    }
  }
};
