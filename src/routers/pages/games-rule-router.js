const GamesRuleView = () => import( /* webpackChunkName: "games-rule" */ '@/views/pages/games-rule/index');
const SportsGamesView = () => import( /* webpackChunkName: "games-rule" */ '@/views/pages/games-rule/sports-games/index');
const ImmortalGamesView = () => import( /* webpackChunkName: "games-rule" */ '@/views/pages/games-rule/immortal-games/index');
const ElectronGamesView = () => import( /* webpackChunkName: "games-rule" */ '@/views/pages/games-rule/electron-games/index');
const LotteryGamesView = () => import( /* webpackChunkName: "games-rule" */ '@/views/pages/games-rule/lottery-games/index');

export default [{
  path: '/games-rule',
  component: GamesRuleView,
  meta: {
    noNeedCheckLogin: true,
  },
  children: [
    {
      path: '',
      name: 'sportsGames',
      component: SportsGamesView,
      meta: {
        header: false,
        footer: false,
        verticalMenu: false,
        title: '体育游戏规则',
      },
    },
    {
      path: 'immortal',
      name: 'immortalGames',
      component: ImmortalGamesView,
      meta: {
        header: false,
        footer: false,
        verticalMenu: false,
        title: '真人娱乐规则',
      },
    },
    {
      path: 'electron',
      name: 'electronGames',
      component: ElectronGamesView,
      meta: {
        header: false,
        footer: false,
        verticalMenu: false,
        title: '电子游戏规则',
      },
    },
    {
      path: 'lottery',
      name: 'lotteryGames',
      component: LotteryGamesView,
      meta: {
        header: false,
        footer: false,
        verticalMenu: false,
        title: '彩票投注规则',
      },
    },
  ]
}];
