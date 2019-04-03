import HomeView from '@/views/dashboard/home/index';
const ActivityView = () => import(/* webpackChunkName: "dashboard-activity" */ '@/views/dashboard/activity/index');
const DigitalView = () => import(/* webpackChunkName: "dashboard-digital" */ '@/views/dashboard/digital/index');
export default [
  {
    name: 'home',
    path: '/',
    component: HomeView,
    meta:{
      logo:true,
      footer:true,
      showRightFilter: true,
    }
  },
  {
    name: 'activity',
    path: '/activity',
    component: ActivityView,
    meta: {
      // scrollToTopAtSamePage: false,
      title:"优惠活动",
      footer:false,
    },
  },
  {
    name: 'digital',
    path: '/digital',
    component: DigitalView,
    meta:{
      footer:false,
      header:true,
      title:"PT电子",
    }
  },
  {
    path: ':anything',
    redirect: {
      name: 'home',
    }
  },
  {
    path: '*',
    redirect: {
      name: 'home',
    }
  }
];
