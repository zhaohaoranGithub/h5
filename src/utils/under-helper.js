const core = require('mathjs/core');
import sha1 from 'sha1';
import md5 from 'blueimp-md5';

const math = core.create();

math.import(require('mathjs/lib/function/arithmetic/add'));
math.import(require('mathjs/lib/function/arithmetic/subtract'));
math.import(require('mathjs/lib/function/arithmetic/multiply'));
math.import(require('mathjs/lib/function/arithmetic/divide'));
math.import(require('mathjs/lib/function/arithmetic/floor'));
math.import(require('mathjs/lib/function/probability/combinations'));

_.mixin({
  combinations: math.combinations,

  unique(arr) {
    const unique = [];
    const repeat = [];
    const hash = {};

    if (!_.isEmpty(arr)) {
      const length = arr.length;
      let i = 0,
        elem;
      for (; i < length; i++) {
        elem = arr[i];
        if (!hash[elem]) {
          unique.push(elem);
          hash[elem] = true;
        } else {
          repeat.push(elem);
        }
      }
    }

    return {
      unique,
      repeat,
    };
  },

  zhLength(str) {
    return str.replace(/[\u4e00-\u9fa5]/g, '**').length;
  },

  fixedConvert2yuan(money, options) {
    options = _.extend({}, {
      fixed: 2,
      clear: false,
    }, options);
    return _.convert2yuan(money, options);
  },

  convert2yuan(money, options) {
    options = _.extend({}, {
      fixed: 2,
      ratio: 1,
      clear: true,
    }, options);

    return _.formatDiv(money, options.ratio, options);
  },

  formatDiv(money, ratio, options) {
    let format;

    money = money || 0;

    options = _.extend({}, {}, options);

    if (!_.isUndefined(money)) {
      format = _.div(money, ratio);

      if (options.fixed || options.fixed === 0) {
        format = format.toFixed(options.fixed);
      }

      if (options.clear) {
        format = math.add(format, 0);
      }
    }

    return format;
  },

  fixed(number, ratio, symbol = false) {
    number = number.toFixed(ratio);
    if (symbol) {
      if (number > 0) {
        number = `+${number}`;
      } else if (number < 0) {
        number = `-${number}`;
      } else {
        number = `${number}`;
      }
    }

    return number;
  },

  formatMul(money, ratio, {
    clear = true,
    fixed = 0
  } = {
    clear: true,
    fixed: 4
  }) {
    let format;

    if (!_.isUndefined(money)) {
      format = _(money).mul(ratio);

      if (fixed) {
        format = format.toFixed(fixed);
      }

      if (clear) {
        format = math.add(format, 0);
      }
    }

    return format;
  },

  // 格式化时间
  toTime(timestamp, format) {
    return timestamp ? moment(timestamp).format(format || 'YYYY-MM-DD H:mm:ss') : timestamp;
  },

  toDate(timestamp, format) {
    return timestamp ? moment(timestamp).format(format || 'YYYY-MM-DD') : timestamp;
  },

  toPeriod({
             // start: [0, 'week'],
             // end: [0, 'week'],
             start = [],
             end = [],
             format = 'YYYY-MM-DD H:mm:ss',
           }) {
    return {
      startTime: moment().add(start[0], start[1]).startOf(start[1]).format(format),
      endTime: moment().add(end[0], end[1]).endOf(end[1]).format(format),
    };
  },

  toTimestamp({
                // start: [0, 'week'],
                // end: [0, 'week'],
                start = [],
                end = [],
                startEnd = true,
              }) {
    if (startEnd) {
      if (start[1] === 'week') {
        return [moment().add(start[0], start[1]).startOf('isoWeek').valueOf(), moment().add(end[0], end[1]).endOf('isoWeek').valueOf()];
      } else {
        return [moment().add(start[0], start[1]).startOf(start[1]).valueOf(), moment().add(end[0], end[1]).endOf(end[1]).valueOf()];
      }
    } else {
      return [moment().add(start[0], start[1]).valueOf(), moment().add(end[0], end[1]).valueOf()];
    }
  },

  add(arg1, arg2) {
    return math.add(arg1, arg2);
  },

  // 除法   arg1除arg2
  div(arg1, arg2) {
    arg1 = arg1 || 0;
    return math.divide(arg1, arg2);
  },

  // 乘法  arg1乘arg2
  mul(arg1, arg2) {
    arg1 = arg1 || 0;
    return math.multiply(arg1, arg2);
  },

  // 减法 arg1减arg2
  sub(arg1, arg2) {
    return math.subtract(arg1, arg2);
  },

  floor(arg1, index) {
    const sArg1 = String(arg1);
    const pos = sArg1.indexOf('.');
    if (pos > -1) {
      return Number(sArg1.substring(0, pos + index + 1));
    }
    return arg1;
  },

  toDomain(preDomain, fullDomain = 'https://www.ballbet1.com') {
    return `${preDomain}.${fullDomain.replace(/^(?:http(?:s)?:\/\/)(?:www.)?(.*)/g, '$1')}`;
  },
  getFirstLevelDomain({
                        fullDomain = document.location.hostname,
                        change = true
                      } = {}) {
    let firstLevelDomain = fullDomain;
    if (fullDomain.indexOf('localhost') > -1 && change) {
      fullDomain = 'www.ballbet1.com';
    }
    let domainSplitArr = fullDomain.split('.');
    if (domainSplitArr.length !== 4 && _.isNaN(Number(domainSplitArr[3]))) {
      firstLevelDomain = _.takeRight(fullDomain.split('.'), 2).join('.');
    }
    return firstLevelDomain;
  },

  extractTeamMember(value, position = 1) {
    if (value) {
      return _.map(value.split(';'), originData => {
        let originList = originData.split(',');
        return originList[position];
      });
    } else {
      return [];
    }
  },

  getProxyAddress() {
    let preDomain = _.first(window.document.location.host.split('.'));
    const domain = _.takeRight(window.document.location.host.split('.'), 2);

    if (preDomain === 'www') {
      preDomain = 'f';
    } else {
      preDomain = `f-${preDomain}`;
    }

    return `//${preDomain}.${domain.join('.')}`;
  },

  /**
   *
   * https://github.com/freearhey/vue2-filters.git
   * 12345 => $12,345.00
   *
   * @param {String} symbol
   * @param {Number} decimals Decimal places
   * @param {Object} options
   */

  currency(value, symbol = '', decimals = 2, options) {
    let thousandsSeparator, symbolOnLeft, spaceBetweenAmountAndSymbol;
    let digitsRE = /(\d{3})(?=\d)/g;
    options = options || {};
    value = parseFloat(value);
    if (!isFinite(value) || (!value && value !== 0)) return '';

    thousandsSeparator = options.thousandsSeparator != null ? options.thousandsSeparator : ',';

    symbolOnLeft = options.symbolOnLeft != null ? options.symbolOnLeft : true;

    spaceBetweenAmountAndSymbol = options.spaceBetweenAmountAndSymbol != null ? options.spaceBetweenAmountAndSymbol : false;

    // let stringified = Math.abs(value).toFixed(decimals);
    let stringified = _.floor(Math.abs(value), decimals).toFixed(decimals);
    // let stringified = _.floor(Math.abs(value), decimals);

    stringified = options.decimalSeparator ?
      stringified.replace('.', options.decimalSeparator) :
      stringified;

    let _int = decimals ?
      stringified.slice(0, -1 - decimals) :
      stringified;

    let i = _int.length % 3;

    let head = i > 0 ?
      (_int.slice(0, i) + (_int.length > 3 ? thousandsSeparator : '')) :
      '';

    let _float = decimals ?
      stringified.slice(-1 - decimals) :
      '';

    symbol = spaceBetweenAmountAndSymbol ?
      (symbolOnLeft ? symbol + ' ' : ' ' + symbol) :
      symbol;

    symbol = symbolOnLeft ?
      symbol + head +
      _int.slice(i).replace(digitsRE, '$1' + thousandsSeparator) + _float :
      head +
      _int.slice(i).replace(digitsRE, '$1' + thousandsSeparator) + _float + symbol;

    let sign = value < 0 ? '-' : '';

    return sign + symbol;
  },

  toConverter(value, constName) {
    if (_.isArray(value)) {
      return _.map(value, _.partial(_._toConverter, _, constName));
    } else {
      return _._toConverter(value, constName);
    }
  },

  _toConverter(value, constName) {
    try {
      return _.find(consts[constName], {
        value
      }).title;
    } catch (e) {
      return value;
      // throw new Error(`${constName}没有找到对应的值${value}`);
    }
  },

  revertConverter(value, constName) {
    if (_.isArray(value)) {
      return _.map(value, _.partial(_._revertConverter, _, constName));
    } else {
      return _._revertConverter(value, constName);
    }
  },

  _revertConverter(title, constName) {
    return _.find(consts[constName], {
      title
    }).value;
  },

  returnStatusText(value) {
    for (let item of (consts.ACTIVITY_STATUS_LIST)) {
      if (item.status === value) return item.value;
    }
  },
  returnShowPlatform(array) {
    let str = '';
    array = eval(array);
    if (_.size(array) === _.size(consts.APPLY_PLATFORMLIST)) {

      return '全平台通用';
    } else {
      _.forEach(consts.APPLY_PLATFORMLIST, (value) => {
        if (_.size(array) === _.size(consts.APPLY_PLATFORMLIST)) return;
        array.push('');
      });


      _.forEach(consts.APPLY_PLATFORMLIST, (item, keys) => {
        _.find(consts.APPLY_PLATFORMLIST, (o) => {
          if (o.id === array[keys]) {
            str += (o.games + ',');
          }
        });
      });


      return str.substring(0, str.length - 1);
    }

  },

  withdrawStatus(value) {
    if (_.includes([...consts.WITHDRAW_STATUS_PAYMENT_OUT_ING, ...consts.WITHDRAW_STATUS_AUDIT_ING], value)) {
      return '<span style="color: #54c262;">处理中</span>';
    } else if (_.includes(consts.WITHDRAW_STATUS_SUCCESS, value)) {
      return '<span style="color: #1E5ADC;">成功</span>';
    } else {
      return '<span style="color: red;">失败</span>';
    }
  },
  getUrlRelativePath() {
    var url = document.location.toString();
    var arrUrl = url.split("//");

    var start = arrUrl[1].indexOf("/");
    var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

    if (relUrl.indexOf("?") != -1) {
      relUrl = relUrl.split("?")[0];
    }
    return relUrl;
  },
  isOpenByBrowser(){
    let UA = navigator.userAgent.toLowerCase();
    if(UA.match(/MicroMessenger/i) == "micromessenger" || UA.match(/WeiBo/i) == "weibo"
      || UA.indexOf('baidu') > -1){
      return true;
    }else{
      return false;
    }
  }
});
