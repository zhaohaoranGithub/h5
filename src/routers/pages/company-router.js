const CompanyView = () => import( /* webpackChunkName: "company" */ '@/views/pages/company/index');
const LotteryblameView = () => import( /* webpackChunkName: "company" */ '@/views/pages/company/lottery-blame/index');
const UserAgreementView = () => import( /* webpackChunkName: "company" */ '@/views/pages/company/user-agreement/index');
const ClauseView = () => import( /* webpackChunkName: "company" */ '@/views/pages/company/clause/index');
const ConcealView = () => import( /* webpackChunkName: "company" */ '@/views/pages/company/conceal/index');
export default [{
  path: '/company',
  component: CompanyView,
  meta: {
    noNeedCheckLogin: true,
  },
  children: [
    // {
    //     path: '',
    //     name: 'company',
    //     component: LotteryDeclareView,
    //     meta: {
    //         header: false,
    //         footer: false,
    //         verticalMenu: false,
    //         title:"博彩声明"
    //     },
    // },
    {
      path: '',
      name: 'lotteryBlame',
      component: LotteryblameView,
      meta: {
        header: false,
        footer: false,
        verticalMenu: false,
        title: '博彩责任',
      },
    },
    {
      path: 'user-agreement',
      name: 'userAgreement',
      component: UserAgreementView,
      meta: {
        header: false,
        footer: false,
        verticalMenu: false,
        title: "用户协议",
      },
    },
    {
      path: 'clause',
      name: 'clause',
      component: ClauseView,
      meta: {
        header: false,
        footer: false,
        verticalMenu: false,
        title: "条款条约",
      },
    },
    {
      path: 'conceal',
      name: 'conceal',
      component: ConcealView,
      meta: {
        header: false,
        footer: false,
        verticalMenu: false,
        title: '隐私',
      },
    },
  ]
}];
