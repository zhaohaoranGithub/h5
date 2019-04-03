const ManageCenter = () => import(/* webpackChunkName: "manage-center" */ '@/views/manage-center/index.vue');
const PersonalData = () => import(/* webpackChunkName: "manage-center" */ '@/views/manage-center/personal-data/index.vue');
const CapitalRecord = () => import(/* webpackChunkName: "manage-center" */ '@/views/manage-center/capital-record/index.vue');
const CapitalDetail = () => import(/* webpackChunkName: "manage-center" */ '@/views/manage-center/capital-record/index-detail.vue');
const BettingRecord = () => import(/* webpackChunkName: "manage-center" */ '@/views/manage-center/betting-record/index.vue');
const BettingDetail = () => import(/* webpackChunkName: "manage-center" */ '@/views/manage-center/betting-record/index-detail.vue');
const SelectLine = () => import(/* webpackChunkName: "manage-center" */ '@/views/manage-center/select-line/index.vue');
const MessageCenter = () => import(/* webpackChunkName: "manage-center" */ '@/views/manage-center/message-center/index.vue');
const NoticeDetail = () => import(/* webpackChunkName: "manage-center" */ '@/views/manage-center/message-center/index-detail.vue');
const agency = () => import(/* webpackChunkName: "manage-center" */ '@/views/manage-center/agency/index');

export default [
  // 管理中心主页
  {
    name: 'manageCenter',
    path: '/mc',
    component: ManageCenter,
    meta:{
      header: true,
      footer: false,
      verticalMenu: false,
      backPath: '/',
      showRightFilter: true,
      rightFilterStyle: 'download',
      // rightFilterStyle: 'double',
      title:"个人中心"
    }
  },
  // 个人资料
  {
    name: 'personalData',
    path: '/mc/pd',
    component: PersonalData,
    meta:{
      header: true,
      footer: false,
      verticalMenu: false,
      showRightFilter: false,
      title:"个人资料"
    }
  },
  // 资金明细
  {
    name: 'capitalRecord',
    path: '/mc/cr',
    component: CapitalRecord,
    meta:{
      header: true,
      footer: false,
      verticalMenu: false,
      showRightFilter: true,
      rightFilterStyle: 'screen',
      title:"资金明细"
    }
  },
  // 资金明细(详情)
  {
    name: 'capitalDetail',
    path: '/mc/cd',
    component: CapitalDetail,
    meta:{
      header: true,
      footer: false,
      verticalMenu: false,
      showRightFilter: false,
      // rightFilterStyle: 'screen',
      title:"资金明细"
    },
    props: (route) => ({
      status: route.query.status,
      orderType: route.query.orderType,
      orderId: route.query.orderId,
      createTime: route.query.createTime,
      orderDesc: route.query.orderDesc,
      remark: route.query.remark,
      amount: route.query.amount,
      fee: route.query.fee,
      reallyAmount: route.query.reallyAmount
    }),
  },
  // 投注记录
  {
    name: 'bettingRecord',
    path: '/mc/br',
    component: BettingRecord,
    meta:{
      header: true,
      footer: false,
      verticalMenu: false,
      showRightFilter: false,
      title:"投注记录"
    },
    // props: (route) => ({
    //   gameId: route.query.gameId,
    //   channelId: route.query.channelId,
    //   time: route.query.time
    // }),
  },
  // 投注记录(详情)
  {
    name: 'bettingDetail',
    path: '/mc/bd/',
    component: BettingDetail,
    meta:{
      header: true,
      footer: false,
      verticalMenu: false,
      showRightFilter: false,
      title:"投注记录"
    },
    props: (route) => ({
      gameId: route.query.gameId,
      channelId: route.query.channelId,
      time: route.query.time,
      bettingTimes: route.query.bettingTimes,
      winSum: route.query.winSum,
    }),
  },
  // 线路选择
  {
    name: 'selectLine',
    path: '/mc/sl',
    component: SelectLine,
    meta:{
      header: true,
      footer: false,
      verticalMenu: false,
      showRightFilter: false,
      title:"线路选择"
    }
  },
  // 消息中心
  {
    name: 'messageCenter',
    path: '/mc/mc',
    component: MessageCenter,
    meta:{
      header: true,
      footer: false,
      verticalMenu: false,
      showRightFilter: true,
      rightFilterStyle: 'text',
      rightFilterText: '全部已读',
      title:"我的消息"
    }
  },
  {
    name: 'agency',
    path: '/mc/ag',
    component: agency,
    meta:{
      header: true,
      footer: false,
      verticalMenu: false,
      showRightFilter: false,
      title:"我的代理"
    }
  },
  // 消息中心(详情)
  {
    name: 'noticeDetail',
    path: '/mc/nd/:id',
    component: NoticeDetail,
    meta:{
      header: true,
      footer: false,
      verticalMenu: false,
      showRightFilter: false,
      title:"我的消息"
    },
    props: (route) => ({
      id: route.params.id
    }),
  },
];

