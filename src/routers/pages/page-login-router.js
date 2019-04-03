const LoginT = () => import( /* webpackChunkName: "download-login" */ '@/views/pages/download/login');
export default [{
  path: '/loginT',
  component: LoginT,
  meta: {
    title: '贝博娱乐-登陆',
    noNeedCheckLogin: true,
  },
  children: [{
    path: '*',
    redirect: '/loginT'
  }, ]
}];
