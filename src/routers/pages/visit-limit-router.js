const visitLimitView = () => import( /* webpackChunkName: "visitLimit" */ '@/views/pages/visit-limit/index');
export default [{
    path: '/visit-limit',
    name: "visitLimit",
    component: visitLimitView,
    meta: {
      title: "访问限制",
      header: false,
      footer: false,
      noNeedCheckLogin: true,
    },
  }

];
