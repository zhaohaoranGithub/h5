export default () => {
  Vue.filter('formatDiv', _.formatDiv);
  Vue.filter('toTime', _.toTime);
  Vue.filter('toDate', _.toDate);
  Vue.filter('fixedConvert2yuan', _.fixedConvert2yuan);
  Vue.filter('fix2yuan', _.fixedConvert2yuan);
  Vue.filter('convert2yuan', _.convert2yuan);
  Vue.filter('toConverter', _.toConverter);
  Vue.filter('revertConverter', _.revertConverter);
  Vue.filter('fixed', _.fixed);
  Vue.filter('currency', _.currency);
  Vue.filter('join', _.join);
  Vue.filter('returnStatusText', _.returnStatusText);
  Vue.filter('returnShowPlatform', _.returnShowPlatform);
  Vue.filter('withdrawStatus', _.withdrawStatus);
};
