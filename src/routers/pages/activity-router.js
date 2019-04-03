const activityImmortalView = () => import( /* webpackChunkName: "activity" */ '@/views/pages/activity/immortal/index');
const activitySportsView = () => import( /* webpackChunkName: "activity" */ '@/views/pages/activity/sports/index');
const activityPlatformView = () => import( /* webpackChunkName: "activity" */ '@/views/pages/activity/platform/index');
const activitySurvivalView = () => import( /* webpackChunkName: "activity" */ '@/views/pages/activity/first-survival/index');
const activityTigerView = () => import( /* webpackChunkName: "activity" */ '@/views/pages/activity/tiger/index');
const activityRealpassView = () => import( /* webpackChunkName: "activity" */ '@/views/pages/activity/realpass/index');
const redPacket = () => import( /* webpackChunkName: "activity" */ '@/views/pages/activity/red-packet/index');
const SportRecargeView = () => import(/* webpackChunkName: "activity" */ '@/views/pages/activity/sport-recharge/index.vue');
const activityGoldenEgg = () => import(/* webpackChunkName: "activity" */ '@/views/pages/activity/golden-egg/index');
export default [{
    path: '/activity/immortal',
    name: 'activityImmortal',
    component: activityImmortalView,
    meta: {
      header: false,
      footer: false,
      verticalMenu: false,
      title: "真人连赢",
      noNeedCheckLogin: true,
    },
  },
  {
    path: '/activity/sports',
    name: 'activitySports',
    component: activitySportsView,
    meta: {
      header: false,
      footer: false,
      verticalMenu: false,
      title: '体育闯关',
      noNeedCheckLogin: true,
    },
  },
  {
    path: '/activity/platform',
    name: 'activityPlatform',
    component: activityPlatformView,
    meta: {
      header: false,
      footer: false,
      verticalMenu: false,
      title: '平台返水',
      noNeedCheckLogin: true,
    },
  },
  {
    path: '/activity/first-survival',
    name: 'activitySurvival',
    component: activitySurvivalView,
    meta: {
      header: false,
      footer: false,
      verticalMenu: false,
      title: '首存送红利',
      noNeedCheckLogin: true,
    },
  },
  {
    path: '/activity/tiger',
    name: 'activityTiger',
    component: activityTigerView,
    meta: {
      header: false,
      footer: false,
      verticalMenu: false,
      title: '电子老虎机',
      isActivity: true,
      noNeedCheckLogin: true,
    },
  },
  {
    path: '/activity/realpass',
    name: 'activityRealpass',
    component: activityRealpassView,
    meta: {
      header: false,
      footer: false,
      verticalMenu: false,
      title: '真人闯关',
      isActivity: true,
      noNeedCheckLogin: true,
    },
  },
  {
    name: '/activity/sportRecharge',
    path: '/activity/sport-recharge',
    component: SportRecargeView,
    meta: {
      header: false,
      footer: false,
      verticalMenu: false,
      title: '体育充值',
      noNeedCheckLogin: true,
    },
  },
  {
    path: '/activity/red-packet',
    name: 'redPacket',
    component: redPacket,
    meta: {
      header: false,
      footer: false,
      verticalMenu: false,
      title: '红包雨',
      noNeedCheckLogin: true,
    },
  },
  {
    path: '/activity/golden',
    name: 'goldenEgg',
    component: activityGoldenEgg,
    meta: {
      header: false,
      footer: false,
      verticalMenu: false,
      title: '砸彩蛋',
      noNeedCheckLogin: true,
    },
  },
];
