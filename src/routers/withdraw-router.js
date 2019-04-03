const withdrawManager = () => import('@/views/withdraw-manager/withdraw/index');
// const withdraw = () => import('@/views/withdraw-manager/withdraw/index');
const bindPhone = () => import('@/views/withdraw-manager/bind-phone/index');
const warning = () => import('@/views/withdraw-manager/withdraw/warning');
const result = () => import('@/views/withdraw-manager/withdraw/result');
const cardAdd = () => import('@/views/withdraw-manager/bind-card/add');
const cardManager = () => import('@/views/withdraw-manager/bind-card/index');
const withdraTip = () => import('@/views/withdraw-manager/withdraw/withdraw-tip');
const withdraTipH5 = () => import('@/views/withdraw-manager/withdraw/withdraw-tip-h5');
export default [
  {
    path: '/withdraw-manager/index',
    name: 'withdrawManager',
    component: withdrawManager,
    meta: {
      header: true,
      footer: false,
      verticalMenu: false,
      showRightFilter: false,
      title:"提现"
    },
  },
  {
    path: '/withdraw-manager/tip',
    name: 'withdraw-tip',
    component: withdraTip,
    meta: {
      header: false,
      footer: false,
      verticalMenu: false,
      showRightFilter: false,
      title:"提现说明",
      noNeedCheckLogin: true,
    },
  },
  {
    path: '/withdraw-manager/withdraw-tip',
    name: 'withdraw-tip',
    component: withdraTipH5,
    meta: {
      header: true,
      footer: false,
      verticalMenu: false,
      showRightFilter: false,
      title:"提现说明",

    },
  },
  {
    path: '/withdraw-manager/warning',
    name: 'withdrawWarning',
    component: warning,
    meta: {
      header: true,
      footer: false,
      verticalMenu: false,
      showRightFilter: false,
      title:"提现",
      backPath: '/',
    },
  },
  {
    path: '/withdraw-manager/result',
    name: 'withdrawResult',
    component: result,
    meta: {
      header: true,
      footer: false,
      verticalMenu: false,
      showRightFilter: false,
      title:"提现",
      backPath: '/',
    },
  },
  {
    path: '/bind-phone',
    name: 'bindPhone',
    component: bindPhone,
    meta: {
      header: true,
      footer: false,
      verticalMenu: false,
      showRightFilter: false,
      title:"绑定你的手机号"
    },
  },
  {
    path: '/card-manager',
    name: 'cardManager',
    component: cardManager,
    meta: {
      header: true,
      footer: false,
      verticalMenu: false,
      showRightFilter: false,
      title:"添加银行卡"
    },
  },
  {
    path: '/card-add',
    name: 'cardAdd',
    component: cardAdd,
    meta: {
      header: true,
      footer: false,
      verticalMenu: false,
      showRightFilter: false,
      title:"添加银行卡"
    },
  },
];
