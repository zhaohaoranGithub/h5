const IntroduceSportsView = () => import( /* webpackChunkName: "introduce-sport" */ '@/views/pages/introduce/sports/index');
const IntroduceCashNetView = () => import( /* webpackChunkName: "introduce-cash-net" */ '@/views/pages/introduce/cash-net/index');
export default [{
    name: 'introduceSports',
    path: '/introduce-sports',
    component: IntroduceSportsView,
    meta: {
      title: "贝博体育",
      header: false,
      footer: false,
      noNeedCheckLogin: true,
    }
  }, {
    name: 'introduceCashNet',
    path: '/introduce-cashnet',
    component: IntroduceCashNetView,
    meta: {
      title: "贝博现金网",
      header: false,
      footer: false,
      noNeedCheckLogin: true,
    }
  }

];
