const Register = () => import( /* webpackChunkName: "download-register" */ '@/views/pages/download/register');
export default [{
  path: '/register',
  component: Register,
  meta: {
    title: '注册',
    noNeedCheckLogin: true,
  },
  // children: [{
  //   path: '*',
  //   redirect: '/register'
  // }]
}];
