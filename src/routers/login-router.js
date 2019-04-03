const LoginManager = () => import(/* webpackChunkName: "login-manager" */ '@/views/login-manager/index');
const Login = () => import(/* webpackChunkName: "login-manager" */ '@/views/login-manager/login');
const ForgetPassword = () => import(/* webpackChunkName: "login-forget-password" */ '@/views/login-manager/forget-password');
const RegisterMobile = () => import(/* webpackChunkName: "login-register" */ '@/views/login-manager/register/register-mobile');
const RegisterAccount = () => import(/* webpackChunkName: "login-register" */ '@/views/login-manager/register/register-account');
const RegisterSetPass = () => import(/* webpackChunkName: "login-register" */ '@/views/login-manager/register/password-set');
const RegisterSetNickName = () => import(/* webpackChunkName: "login-register" */ '@/views/login-manager/register/nickname-set/index.vue');
const GlobalPhone = () => import(/* webpackChunkName: "login-register" */ '@/views/login-manager/global-phone/index.vue');

export default [
  {
    path: '/login',
    component: LoginManager,
    meta: {
      showTopNav: false,
      noNeedCheckLogin: true,
    },
    children: [
      {
        path: '',
        name: 'login',
        component: Login,
        meta: {
          header: true,
          footer: false,
          verticalMenu: false,
          title:"登录",
          backPath: '/',
        },
      },
      {
        path: '/forget-password',
        name: 'forget-password',
        component: ForgetPassword,
        meta: {
          header: true,
          footer: false,
          verticalMenu: false,
          title:"忘记密码",
          backEvent: 'backEvent',
        }
      },
      {
        path: '/register/mobile',
        name: 'register',
        component: RegisterMobile,
        meta: {
          header: true,
          footer: false,
          verticalMenu: false,
          title:'注册',
        }
      },
      {
        path: '/register/account',
        name: 'registerAccount',
        component: RegisterAccount,
        meta: {
          header: true,
          footer: false,
          verticalMenu: false,
          title: '注册',
        }
      },
      {
        path: '/register/set-pass',
        name: 'registerAccountSetpass',
        component: RegisterSetPass,
        meta: {
          header: true,
          footer: false,
          verticalMenu: false,
          title: '设置密码',
        }
      },
      {
        path: '/register/set-nickname',
        name: 'registerAccountSetnickname',
        component: RegisterSetNickName,
        meta: {
          header: true,
          footer: false,
          verticalMenu: false,
          title: '注册成功',
        }
      },
      {
        path: '/global-phone',
        name: 'globalPhone',
        component: GlobalPhone,
        meta: {
          header: true,
          footer: false,
          verticalMenu: false,
          title: '国家/地区',
        }
      },
    ]
  },
];
