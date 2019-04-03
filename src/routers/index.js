import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
import aboutUsRouter from "@/routers/pages/about-us-router";
import companyRouter from "@/routers/pages/company-router";
import gamesRouter from "@/routers/pages/games-rule-router";
import courseRouter from "@/routers/pages/course-router";
import helpRouter from "@/routers/pages/help-center-router";
import activityRouter from "@/routers/pages/activity-router";
import downloadRouter from "@/routers/pages/download-router";
import registerRouter from "@/routers/pages/register-router";
import intro from "@/routers/pages/intro-router";
import introduceRouter from "@/routers/pages/introduce-router";
import shareRouter from "@/routers/pages/share-router";
import sponsorRouter from "@/routers/pages/sponsor-router";
import installRouter from "@/routers/pages/install-router";
import visitLimitRouter from "@/routers/pages/visit-limit-router";
import pagesLoginRouter from '@/routers/pages/page-login-router';


import loginManagerRouter from '@/routers/login-router';
import dashboardRouter from '@/routers/dashboard-router';
import PagesRouter from '@/routers/pages-router';
import manageRouter from '@/routers/manage-router';
import FundRouter from '@/routers/fund-router';
import withdrawRouter from '@/routers/withdraw-router';

const addPermission = (routers, metas = {
  header: true,
  footer: true,
  verticalMenu: true,
}) => {
  return _.map(routers, router => {
    if (router.children) {
      router.children = addPermission(router.children);
    }

    router.meta = _.defaults({}, router.meta, metas);
    // _.each(metas, (value, prop) => {
    //   _.set(router, `meta.${prop}`, value);
    // });
    return router;
  });
};

const router = new Router({
  mode: "history",
  routes: [
    ...aboutUsRouter,
    ...companyRouter,
    ...gamesRouter,
    ...courseRouter,
    ...helpRouter,
    ...activityRouter,
    ...downloadRouter,
    ...registerRouter,
    ...introduceRouter,
    ...shareRouter,
    ...sponsorRouter,
    ...installRouter,
    ...visitLimitRouter,
    ...intro,
    ...pagesLoginRouter,

    ...loginManagerRouter,
    ...manageRouter,
    ...withdrawRouter,
     ...FundRouter,
    ...addPermission(dashboardRouter),
    ...addPermission(PagesRouter),
   
  ],
  scrollBehavior(to, from, savedPosition) {
    if (_.get(to, 'meta.scrollToTopAtSamePage', true) || to.name !== from.name) {
      return {
        x: 0,
        y: 0
      };
    }
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    //如果设置标题，拦截后设置标题
    document.title = to.meta.title;
  }
  let host = window.location.host;
  let domainArr = host.split('.');

  // if ((to.path == '' || to.path == '/') && domainArr && domainArr.length == 3 && domainArr[0] == 'd') {
  //   next({
  //     path: '/download'
  //   });
  // } else if ((to.path == '' || to.path == '/') && domainArr && domainArr.length == 3 && domainArr[0] !== 'd') {
  //   // 运营特殊需要：d.ballbet.com 如左，d.开头的域名直接访问时需要直接跳转到下载页
  //   next({
  //     path: '/register'
  //   });
  // }
  next();
});

export default router;
