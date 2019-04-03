const SportsShareView = () => import( /* webpackChunkName: "share-sports" */ '@/views/pages/share/bet-ball-sports/index');
const DisportShareView = () => import( /* webpackChunkName: "share-disport" */ '@/views/pages/share/bet-ball-disport/index');
export default [{
  name: 'betBallSports',
  path: '/share/bet-ball-sports',
  component: SportsShareView,
  meta: {
    title: "贝博体育",
    header: false,
    footer: false,
    noNeedCheckLogin: true,
  }
}, {
  name: 'betBallDisport',
  path: '/share/bet-ball-disport',
  component: DisportShareView,
  meta: {
    title: "贝博娱乐",
    header: false,
    footer: false,
    noNeedCheckLogin: true,
  }
}

];
