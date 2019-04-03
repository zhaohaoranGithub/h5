const AboutUsView = () => import( /* webpackChunkName: "about-us" */ '@/views/pages/about-us/index');
const AboutAgencyView = () => import( /* webpackChunkName: "agency" */ '@/views/pages/about-us/agency');
export default [{
    name: 'about-us',
    path: '/about-us',
    component: AboutUsView,
    meta: {
      header: false,
      footer: false,
      verticalMenu: false,
      title: "关于我们",
      noNeedCheckLogin: true,//此路由下不需要检查是否已登陆
    }
  },
  {
    name: 'about-us-h5',
    path: '/about-us-h5',
    component: AboutUsView,
    meta: {
      header: true,
      footer: false,
      verticalMenu: false,
      title: "关于我们",
      noNeedCheckLogin: true,
    }
  },
  {
    name: 'about-f',
    path: '/about-f',
    component: AboutAgencyView,
    meta: {
      header: false,
      footer: false,
      verticalMenu: false,
      title: "关于代理",
      noNeedCheckLogin: true,
    }
  },
];
