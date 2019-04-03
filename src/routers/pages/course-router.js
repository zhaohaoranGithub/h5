const CourseView = () => import( /* webpackChunkName: "course" */ '@/views/pages/course/index');
const H5CourseView = () => import( /* webpackChunkName: "course" */ '@/views/pages/course/index-h5');
const RechargeCourseView = () => import( /* webpackChunkName: "course" */ '@/views/pages/course/recharge-course/index');
const WithdrawCourseView = () => import( /* webpackChunkName: "course" */ '@/views/pages/course/withdraw-course/index');
const SportsCourseView = () => import( /* webpackChunkName: "course" */ '@/views/pages/course/bet/index');
export default [

  {
    path: '/course',
    component: CourseView,
    children: [{
      name: 'rechargeCourse',
      path: '',
      component: RechargeCourseView,
      meta: {
        header: false,
        footer: false,
        verticalMenu: false,
        title: "充值教程",
        backPath: '/mc',
      }
    }, {
      name: 'withdrawCourse',
      path: 'withdraw',
      component: WithdrawCourseView,
      meta: {
        header: false,
        footer: false,
        verticalMenu: false,
        title: "提现教程",
        backPath: '/mc',
      }
    }, {
      name: 'betCourse',
      path: 'bet',
      component: SportsCourseView,
      meta: {
        header: false,
        footer: false,
        verticalMenu: false,
        title: "投注教程",
        backPath: '/mc',
      }
    }
    ]
  },
  {
    name: 'courseH5',
    path: '/course-h5',
    redirect: '/course-h5/',
    component: H5CourseView,
    meta: {
      noNeedCheckLogin: true,
    },
    children: [{
      name: 'rechargeCourse-h5',
      path: '/',
      component: RechargeCourseView,
      meta: {
        header: true,
        footer: false,
        verticalMenu: false,
        title: "充值教程",
        backPath: '/mc',
        noNeedCheckLogin: true,
      }
    }, {
      name: 'withdrawCourse-h5',
      path: 'withdraw',
      component: WithdrawCourseView,
      meta: {
        header: true,
        footer: false,
        verticalMenu: false,
        title: "提现教程",
        backPath: '/mc',
        noNeedCheckLogin: true,
      }
    }

    ]
  },

];
