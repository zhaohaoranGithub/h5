const SponsorView = () => import( /* webpackChunkName: "sponsor" */ '@/views/pages/sponsor/index');
export default [
  {
    name: 'sponsor',
    path: '/sponsor',
    component: SponsorView,
    meta: {
      title: "贝博娱乐",
      header: false,
      footer: false,
      noNeedCheckLogin: true,
    }
  },
];
