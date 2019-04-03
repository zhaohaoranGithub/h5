const Recharge = () => import(/* webpackChunkName: "fund-recharge" */ '@/views/finance/recharge/index');
const RechargePayment = () => import(/* webpackChunkName: "fund-recharge" */ '@/views/finance/recharge/recharge-choose-payment');
const RechargeStatus = () => import(/* webpackChunkName: "fund-recharge" */ '@/views/finance/recharge/recharge-status');
const Transfer = () => import(/* webpackChunkName: "fund-transfers" */ '@/views/finance/transfers');
const Wallet = () => import(/* webpackChunkName: "fund-wallet" */ '@/views/finance/wallet');

export default [{
    name: "fund-transfer",
    path: "/fund/transfers",
    component: Transfer,
    meta: {
      header: true,
      title: "转账",
    }
  },
  {
    name: "recharge",
    path: "/fund/recharge",
    component: Recharge,
    meta: {
      header: true,
      title: "充值",
      backPath: "/"
    }
  },
  {
    name: "Wallet",
    path: "/fund/wallet",
    component: Wallet,
    meta: {
      header: true,
      title: "我的钱包"
    }
  },

  {
    name: "finance-payment",
    path: "/fund/recharge-type",
    component: RechargePayment,
    props: (route) => ({
      rechargeAmount: route.query.rechargeAmount,
      type: route.query.type,
    }),
    meta: {
      header: true,
      title: "选择充值方式",
      backPath: "/fund/recharge"
    }
  },
  {
    name: "recharge-status",
    path: "/fund/recharge-status",
    component: RechargeStatus,
    meta: {
      header: true,
      title: "充值信息",
      backPath: "/"
    }
  }
];
