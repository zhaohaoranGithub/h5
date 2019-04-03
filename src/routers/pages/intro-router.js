const Intro = () => import( /* webpackChunkName: "introduction" */ '@/views/pages/download/introduction');
export default [{
    path: '/introduction',
    component: Intro,
    meta: {
      header: false,
      footer: false,
      noNeedCheckLogin: true,
    },
    children: [{
      path: '*',
      redirect: '/introduction'
    }]
  },

];
