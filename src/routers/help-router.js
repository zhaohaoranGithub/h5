const HelpView = () => import(/* webpackChunkName: "help" */ '@/views/help-center/index');

export default [
  {
    name: 'help-center',
    path: '/help-center',
    component: HelpView,
    props: (route) => ({
      path: route.query.path
    })
  }
];
