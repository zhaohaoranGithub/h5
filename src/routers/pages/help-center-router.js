const helpCenterView = () => import( /* webpackChunkName: "help-center" */ '@/views/pages/help-center/index');
const registerView = () => import( /* webpackChunkName: "help-center" */ '@/views/pages/help-center/register/index');
const depositView = () => import( /* webpackChunkName: "help-center" */ '@/views/pages/help-center/deposit/index');
const discountView = () => import( /* webpackChunkName: "help-center" */ '@/views/pages/help-center/discount/index');
const browserView = () => import( /* webpackChunkName: "help-center" */ '@/views/pages/help-center/browser/index');
const appProblemView = () => import( /* webpackChunkName: "help-center" */ '@/views/pages/help-center/app-problem/index');
const ProblemView = () => import( /* webpackChunkName: "help-center" */ '@/views/pages/help-center/common-problem/index');
export default [{
  path: '/help-center',
  component: helpCenterView,
  meta: {
    noNeedCheckLogin: true,
  },
  children: [{
    path: '',
    name: 'help-register',
    component: registerView,
    meta: {
      header: false,
      footer: false,
      verticalMenu: false,
      title: '如何注册',
    },
  },
    {
      path: 'deposit',
      name: 'help-deposit',
      component: depositView,
      meta: {
        header: false,
        footer: false,
        verticalMenu: false,
        title: '存提转说明',
      },
    },
    {
      path: 'discount',
      name: 'help-discount',
      component: discountView,
      meta: {
        header: false,
        footer: false,
        verticalMenu: false,
        title: '优惠规则说明',
      },
    },
    {
      path: 'browser',
      name: 'help-browser',
      component: browserView,
      meta: {
        header: false,
        footer: false,
        verticalMenu: false,
        title: '浏览器',
      },
    },
    {
      path: 'app-problem',
      name: 'help-app',
      component: appProblemView,
      meta: {
        header: false,
        footer: false,
        verticalMenu: false,
        title: 'APP疑问',
      },
    },
    {
      path: 'problem',
      name: 'help-problem',
      component: ProblemView,
      meta: {
        header: false,
        footer: false,
        verticalMenu: false,
        title: '常见问题',
      },
    },
  ]
}];
