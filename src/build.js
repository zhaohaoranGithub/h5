//directives
import TransferDom from '@/directives/transfer-dom';
import ClickOutside from '@/directives/click-outside';
import Ripple from '@/directives/ripple';
import Waves from '@/directives/waves';
import VueObserveVisibility from 'vue-observe-visibility';

//plugins
import BusPlugin from '@/plugins/bus/index.js';
//mixins
import resetForm from '@/mixins/reset-form';
import form from '@/mixins/form';
import grid from '@/mixins/grid';
import loading from '@/mixins/loading';
import dialog from '@/mixins/dialog';
import factory from '@/mixins/factory';
import pickerOption from '@/mixins/picker-options';
import validator2 from '@/mixins/validator2';
import getCode from '@/mixins/get-code';
import getCommand from '@/mixins/get-command';

import updateBalance from '@/mixins/update-balance';
import capitalOperation from '@/mixins/capital-operation';
import logout from '@/mixins/logout';
import addressSelect from '@/mixins/address-select';
import swiper from '@/mixins/swiper';
import activity from '@/mixins/activity';
import qrCode from '@/mixins/qr-code';
import gotoRecharge from '@/mixins/goto-recharge';



//components
import SvgIcon from '@/components/svg-icon';
import mainContainerContent from '@/components/main-container-content/index.vue';
import mainContainerTitle from '@/components/main-container-title/index.vue';
import step from '@/components/step/index';
import mobileSwiper from '@/components/mobile-swiper/index';
import mobileRechargeSwiper from '@/components/mobile-recharge-swiper/index';
import tab from '@/components/tab/src/index';
import collapse from '@/components/main-collapse-title/index';
import mainCollapseInner from '@/components/main-collapse-inner/index';
import courseContainer from '@/components/course-container/index';
import courseHeader from '@/components/course-container/course-header';
import fullPageSlide from '@/components/fullpage-slide/index';
import PasswordInput from '@/components/password-input';
import imageViewwer from '@/components/image-viewer/index';
import ValidateImg from '@/components/validate-img';
import avatarSelect from '@/components/avatar-select/index';
import PaymentPic from '@/components/payment-pic';
import BankPic from '@/components/bank-pic';
import QuickTransferConfirm from '@/components/quick-transfer-confirm/src';
import Warning from '@/components/el-warning';
import customerService from '@/components/customer-service';
import globalNoticeBar from '@/components/global-notice-bar';
import BadgeText from '@/components/badge-text';
import warningDialog from '@/components/warning-dialog';

import VueQriously from 'vue-qriously';

import VueAwesomeSwiper from 'vue-awesome-swiper';

import VueLazyload from 'vue-lazyload';

import 'swiper/dist/css/swiper.css';

import 'lib-flexible';

import VueClipboard from 'vue-clipboard2';



import '@/themes/common/_page-transitions.scss';


//filters
import filterImport from './filters'; // global filters

// register global utility filters.
filterImport();

//vant-ui
import '@/vant/index.less';
import {
  installVantUi
} from '@/vant/index';

const components = [


  mainContainerContent,
  mainContainerTitle,
  step,
  mobileSwiper,
  tab,
  collapse,
  mainCollapseInner,
  mobileRechargeSwiper,
  courseContainer,
  courseHeader,
  fullPageSlide,
  SvgIcon,
  PasswordInput,
  ValidateImg,
  avatarSelect,
  PaymentPic,
  BankPic,
  BadgeText,
  Warning,

  warningDialog,

  QuickTransferConfirm,

  customerService,

  globalNoticeBar


];

const install = (Vue) => {
  installVantUi(Vue);
  components.map(component => {
    Vue.component(component.name, component);
  });

  Vue.use(BusPlugin);
  Vue.use(VueAwesomeSwiper, /* { default global options } */);
  Vue.use(VueObserveVisibility);
  Vue.use(VueQriously);
  Vue.use(VueClipboard);
  Vue.use(imageViewwer);
  Vue.use(VueLazyload, {
    preLoad: 1.3,
    attempt: 1
  });

  Vue.directive('TransferDom', TransferDom);
  Vue.directive('Ripple', Ripple);
  Vue.directive('Waves', Waves);
  Vue.directive('ClickOutside', ClickOutside);
};

export {
  install,
  //directives
  ClickOutside,


  //plugins

  //factory

  //mixins
  resetForm,
  form,
  dialog,
  loading,
  factory,
  getCommand,
  grid,
  pickerOption,
  validator2,
  // tabs,
  logout,
  getCode,
  capitalOperation,
  addressSelect,
  updateBalance,
  swiper,
  activity,
  qrCode,
  gotoRecharge,
  //filters
};
