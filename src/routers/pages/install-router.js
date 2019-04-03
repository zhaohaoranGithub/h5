const AppInstallHelpView = () => import( /* webpackChunkName: "appInstall" */ '@/views/pages/install-help/index');
const IosInstallHelpView = () => import( /* webpackChunkName: "appInstall" */ '@/views/pages/install-help/ios/index');

export default [{
  path: '/install',
  component: AppInstallHelpView,
  children: [{
    path: '',
    name: 'iosInstallHelp',
    component: IosInstallHelpView,
    meta: {
      title: 'ios安装教程',
    }
  },]
}];
