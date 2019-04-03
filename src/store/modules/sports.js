import {
  sportsListApi,
  sportsVideoApi,
  matchListApi,
  footballScsgApi,
  basketballScsgApi,
} from '@/services/api/sports';

import * as ws from '@/consts/ws';

const initState = () => {
  return {
    //188比赛动画列表(原始数据)
    liveList: [],
    //过滤后的动画列表(不含无法匹配的比赛, 主要)
    filterLiveList: [],
    //过滤后的动画对象(不含无法匹配的比赛, 主要, 用于匹配)
    filterLiveObj: {},
    //分类后的动画列表
    typedLiveList: {},
    footballLiveGroupList: [],
    basketballLiveGroupList: [],

    //188视频列表
    videoList: [],

    //过滤后的视频列表(不含无法匹配的比赛)
    filterVideoList: [],
    //足球scsg列表
    footballScsgList: [],
    //足球事件
    footballEventList: [],
    //足球技术统计
    footballTechnicList: [],


    //足球比赛阵容列表
    // footballLineupList: [],
    //足球伤停列表
    // footballInjuryList: [],


    //篮球scsg列表
    basketballScsgList: [],

    //当前选择比赛 MatchId
    currentMatchId: undefined,
    currentScsgInfo: undefined,

    //当前运动类型
    currentSportsType: consts.FOOTBALL,
  };
};

const getters = {
  sportsLiveGroupList: state => {
    const sportsType = _.find(consts.SPORTS_TYPE_LIST, {
      value: state.currentSportsType
    });
    return state[`${sportsType.type}LiveGroupList`];
  },
  //当前选择比赛 详情
  currentMatchInfo: state => {
    return _.find(state.filterLiveList, {
      matchId: state.currentMatchId
    });
  },
};

// actions
const actions = {
  /**
   * 获取体育比赛赛事信息 总入口
   * @param state
   * @param commit
   * @param dispatch
   * @returns {Promise<void>}
   */
  async [types.GET_SPORTS]({state, commit, dispatch}) {

    //获取足球比赛数据(必须的几个列表)
    const {result} = await dispatch(types.GET_SPORTS_LIVE);

    if (result) {
      //获取篮球足球赛程赛果
      //获取视频
      const footballScsgPromise = dispatch(types.GET_FOOTBALL_MATCH_LIST);
      const basketballPromise = dispatch(types.GET_BASKETBALL_MATCH_LIST);

      // const footballScsgPromise = dispatch(types.GET_FOOTBALL_SCSG);
      // const basketballPromise = dispatch(types.GET_BASKETBALL_SCSG);

      const videoPromise = dispatch(types.GET_SPORTS_VIDEO);

      const allResult = await Promise.all([
        videoPromise,
        footballScsgPromise,
        basketballPromise
      ]);

      const result = _.every(_.map(allResult, 'result'), Boolean);

      if (result) {
        let start = moment.now();
        commit('SPORTS_LIVE_GROUP_LIST', {
          sportsType: consts.FOOTBALL,
          sportsName: 'football'
        });
        commit('SPORTS_LIVE_GROUP_LIST', {
          sportsType: consts.BASKETBALL,
          sportsName: 'basketball'
        });

        commit('SELECT_FIRST_MATCH_BY_SPORTS_TYPE');

        //足球
        //订阅阵容
        commit('SOCKET_SUBSCRIBE', ws.FOOTBALL_LINEUP);
        //订阅伤停
        commit('SOCKET_SUBSCRIBE', ws.FOOTBALL_INJURY);
        //订阅即时赛事
        commit('SOCKET_SUBSCRIBE', ws.FOOTBALL_JS1);
        //订阅技术统计
        commit('SOCKET_SUBSCRIBE', ws.FOOTBALL_TEC);

        //篮球
        //篮球当天
        commit('SOCKET_SUBSCRIBE', ws.BASKETBALL_TODAY);
        //篮球即时
        commit('SOCKET_SUBSCRIBE', ws.BASKETBALL_JS);

        //给videoList插入matchId
        commit(types.COMPUTED_SPORTS_VIDEO);

        commit(types.UNION_SPORTS_DATA, {
          dataName: 'filterVideoList',
          targetName: 'videoInfo',
        });

        console.log(moment.now() - start);
      } else {
        throw new Error(`比赛数据获取失败${_.map(allResult, 'result')}`);
      }

    } else {
      throw new Error(`比赛动画数据获取失败`);
    }
  },

  async [types.GET_SPORTS_LIVE]({commit}) {
    const [result, data] = await sportsListApi();

    if (result !== false) {
      commit(types.GET_SPORTS_LIVE_SUCCESS, data);
    }

    return {result, data};
  },

  async [types.GET_SPORTS_VIDEO]({state, commit}) {
    const [result, data] = await sportsVideoApi({
      type: 'matchlist'
    });
    if (result !== false) {
      commit(types.GET_SPORTS_VIDEO_SUCCESS, data);
    }

    return {result, data};
  },


  async [types.GET_FOOTBALL_MATCH_LIST]({commit, state}) {
    const [result, data] = await matchListApi({
      gameId: 1,
    });

    if (result) {
      commit(types.GET_FOOTBALL_SCSG_SUCCESS, data);
    }

    return {result, data};
  },

  async [types.GET_BASKETBALL_MATCH_LIST]({commit, state}) {
    const [result, data] = await matchListApi({
      gameId: 2,
    });

    if (result) {
      commit(types.GET_BASKETBALL_SCSG_SUCCESS, data);
    }

    return {result, data};
  },

  /**
   * 足球近三天赛程赛果
   * @param commit
   * @param state
   * @returns {Promise<{result, data}>}
   */
  async [types.GET_FOOTBALL_SCSG]({commit, state}) {
    const allPromise = _.map([[0, 'day'], [1, 'day']], time => {
      return footballScsgApi({
        time
      });
    });

    const allResult = await Promise.all(allPromise);

    const result = _.every(_.map(allResult, '0'), Boolean);
    const data = _.flatten(_.map(allResult, '1'));
    if (result) {
      commit(types.GET_FOOTBALL_SCSG_SUCCESS, data);
    }

    return {result, data};
  },

  /**
   * 篮球近三天赛程赛果
   * @param commit
   * @param state
   * @returns {Promise<{result, data}>}
   */
  async [types.GET_BASKETBALL_SCSG]({commit, state}) {
    const allPromise = _.map([[0, 'day'], [1, 'day']], time => {
      return basketballScsgApi({
        time
      });
    });

    const allResult = await Promise.all(allPromise);

    const result = _.every(_.map(allResult, '0'), Boolean);
    const data = _.flatten(_.map(allResult, '1'));
    if (result) {
      commit(types.GET_BASKETBALL_SCSG_SUCCESS, data);
    }

    return {result, data};
  }
};

// mutations
const mutations = {
  //动画接口
  [types.GET_SPORTS_LIVE_SUCCESS](state, data) {
    state.liveList = data;
  },
  [types.GET_SPORTS_VIDEO_SUCCESS](state, data) {
    state.videoList = data;
  },

  SPORTS_LIVE_GROUP_LIST (state, {sportsType, sportsName}) {
    //分层 球类=》直播状态 =》联赛
    state[`${sportsName}LiveGroupList`] = _(state.typedLiveList[sportsType])
      .groupBy('status')
      .toPairs().sortBy((arr) => {
        return _.findIndex(consts.MATCH_TOTAL_STATUS, {
          value: Number(arr[0])
        });
      })
      .map(([status, list]) => {
        return {
          label: _.toConverter(Number(status), 'MATCH_TOTAL_STATUS'),
          options: _(list).groupBy('league').map((list, league) => {
            return {
              label: league,
              options: list
            };
          }).value()
        };
      }).value();
  },

  //聚合数据
  [types.UNION_SPORTS_DATA](state, {dataName, targetName, dataMatchId = 'matchId', formatter = null, merge = false}) {
    let count = 0;
    // _.each(state.filterLiveList, (liveInfo) => {
    //   _.each(state[dataName], info => {
    //     info[dataMatchId] = Number(info[dataMatchId]);
    //     if (liveInfo.matchId === info[dataMatchId]) {
    //       Vue.set(liveInfo, targetName, formatter ? formatter(info) : info);
    //       count++;
    //
    //       return false;
    //     }
    //   });
    // });
    _.each(_.isString(dataName) ? state[dataName] : dataName, info => {
      info[dataMatchId] = Number(info[dataMatchId]);
      if (state.filterLiveObj[info[dataMatchId]]) {
        if (merge) {

          state.filterLiveObj[info[dataMatchId]][targetName] = Object.assign(
            {},
            state.filterLiveObj[info[dataMatchId]][targetName],
            formatter ? formatter(info) : info
          );
        } else {
          Vue.set(state.filterLiveObj[info[dataMatchId]], targetName, formatter ? formatter(info) : info);
        }

        count++;
      }
    });

    // console.log(`${targetName}匹配到${count}条数据`);
  },

  //足球赛程赛果
  [types.GET_FOOTBALL_SCSG_SUCCESS](state, data) {
    state.footballScsgList = data || [];

    //过滤无用数据
    this.commit(types.SPORTS_DATA_FILTER, {
      type: consts.FOOTBALL,
      dataName: 'footballScsgList'
    });

  },
  //篮球赛程赛果
  [types.GET_BASKETBALL_SCSG_SUCCESS](state, data) {
    state.basketballScsgList = data || [];

    //过滤无用数据
    this.commit(types.SPORTS_DATA_FILTER, {
      type: consts.BASKETBALL,
      dataName: 'basketballScsgList',
      matchIdName: 'event_id',
    });
  },

  //过滤
  //1 matchId和188Id不匹配的数据
  //2 过滤非直播比赛
  [types.SPORTS_DATA_FILTER] (state, {
    dataName,
    type,
    matchIdName = 'matchId',
    u188Id = '188ID',
  }) {

    const filteredList = _(state.liveList)
      .intersectionWith(state[dataName], (liveInfo, scsgInfo) => {
        const flag = Number(liveInfo['matchid']) === Number(scsgInfo[matchIdName]);

        if (flag) {
          liveInfo.matchId = Number(scsgInfo[matchIdName]);
          liveInfo['188Id'] = Number(scsgInfo[u188Id]);
          Vue.set(liveInfo, 'scsgInfo', scsgInfo);
        }

        return flag;
      })
      .map(liveInfo => {
        return {
          ...liveInfo,
          value: Number(liveInfo.matchId),
          label: `${liveInfo.team1} vs ${liveInfo.team2} （${liveInfo.start_date}）`,
        };
    }).filter(liveInfo => {
      return _.includes([3, 4, 1], liveInfo.status);
    }).value();

    state.filterLiveObj = {...state.filterLiveObj, ..._.keyBy(filteredList, 'matchId')};

    Vue.set(state.typedLiveList, type, filteredList);

    state.filterLiveList = _.unionBy(state.typedLiveList[type], state.filterLiveList, 'matchId');

  },

  // TYPED_LIVE_LIST (state) {
  //   state.typedLiveList = _.groupBy(state.filterLiveList, 'sport_type');
  // },

  [types.COMPUTED_SPORTS_VIDEO] (state) {
    // state.filterVideoList = _.filter(state.videoList, (videoInfo) => {
    //   if (state.filterLiveList[videoInfo.match_no]) {
    //
    //   }
    //   videoInfo.matchId = Number(liveInfo.matchId);
    //
    //   return flag;
    // });
    state.filterVideoList = _.intersectionWith(state.videoList, state.filterLiveList, (videoInfo, liveInfo) => {
      const flag = Number(videoInfo.match_no) === Number(liveInfo['188Id']);
      if (flag) {
        videoInfo.matchId = Number(liveInfo.matchId);
      }
      return flag;
    });
  },

  /**
   * 根据类型选择第一场比赛
   * @param state
   * @constructor
   */
  SELECT_FIRST_MATCH_BY_SPORTS_TYPE (state) {
    const sportsType = _.find(consts.SPORTS_TYPE_LIST, {
      value: state.currentSportsType
    });

    const matchInfo = _.result(state[`${sportsType.type}LiveGroupList`], '0.options.0.options.0');

    if (matchInfo) {
      this.commit(types.SET_MATCH_ID, matchInfo.matchId);
    }
  },

  /**
   * 格式化足球事件统计
   */
  COMPUTE_FOOTBALL_EVENT (state , {eventList}) {
    const cEventList = _(eventList).map(eventInfo => {
      return {
        ...eventInfo,
        hwFlag: Number(eventInfo.hwFlag),
        eventType: Number(eventInfo.eventType),
        matchId: Number(eventInfo.matchId),
      };

    })
      .groupBy('matchId')
      .map((list, matchId) => {
        return {
          list, matchId
        };
      })
      .value();

    this.commit(types.UNION_SPORTS_DATA, {
      dataName: cEventList,
      targetName: 'eventInfo',
    });
  },

  /**
   * 格式化足球技术统计
   * @param state
   * @param technicList
   * @constructor
   */
  COMPUTE_FOOTBALL_TECHNIC (state, {technicList}) {
    const cTechnicList = _.map(technicList, techinicStr => {
      const cTechnic = techinicStr.split('^');
      const matchId = Number(cTechnic[0]);
      const list =  _.map(cTechnic[1].split(';'), singleTecStr => {
        const singleTec = singleTecStr.split(',');
        const tecInfo = _.find(consts.SPORTS_TEC, {
          value: Number(singleTec[0])
        });

        if (!tecInfo) {
          return;
        }

        return {
          name: tecInfo.title,
          home: singleTec[1],
          away: singleTec[2],
        };
      });

      return {
        matchId,
        list
      };
    });

    this.commit(types.UNION_SPORTS_DATA, {
      dataName: cTechnicList,
      targetName: 'technicInfo',
    });
  },


  /**
   * 实时数据 + 事件直播
   */
  SOCKET_FOOTBALL_TEC (state, data) {
    data = data.data;
    state.footballEventList = data.event;
    state.footballTechnicList = data.technic;

    this.commit('COMPUTE_FOOTBALL_EVENT', {eventList: data.event});
    this.commit('COMPUTE_FOOTBALL_TECHNIC', {technicList: data.technic});
  },

  SOCKET_FOOTBALL_JS1 (state, data) {
    data = data.data;

    this.commit(types.UNION_SPORTS_DATA, {
      dataName: data,
      targetName: 'scsgInfo',
      merge: true,
      formatter: info => {
        return _.pick(info, [
          'away_red_card',
          'away_score',
          'away_first_score',
          'away_yellow_card',
          'home_first_score',
          'home_red_card',
          'home_score',
          'home_yellow_card',
          'matchState'
        ]);
      }
    });
  },

  SOCKET_FOOTBALL_LINEUP (state, data) {
    data = data.data;
    // state.footballLineupList = data;

    this.commit(types.UNION_SPORTS_DATA, {
      dataName: data,
      targetName: 'lineupInfo',
      dataMatchId: 'ID',
      formatter: info => {
        return {
          homeLineup: _.extractTeamMember(info.HomeLineup),
          homeBackup: _.extractTeamMember(info.HomeBackup),
          awayLineup: _.extractTeamMember(info.AwayLineup),
          awayBackup: _.extractTeamMember(info.AwayBackup),
        };
      }
    });
  },

  SOCKET_FOOTBALL_INJURY(state, data) {
    data = data.data;
    // state.footballInjuryList = data;

    this.commit(types.UNION_SPORTS_DATA, {
      dataName: data,
      targetName: 'injuryInfo',
      dataMatchId: 'matchId',
      formatter: info => {
        return {
          awayInjure: _.extractTeamMember(info.AwayInjure),
          awayStop: _.extractTeamMember(info.AwayStop),
          homeInjure: _.extractTeamMember(info.HomeInjure),
          homeStop: _.extractTeamMember(info.HomeStop),
        };
      }
    });
  },
  SOCKET_BASKETBALL_JS(state, data) {
    data = data.data;

    this.commit(types.UNION_SPORTS_DATA, {
      dataName: data,
      merge: true,
      targetName: 'scsgInfo',
      dataMatchId: 'event_id'

    });
  },

  SOCKET_BASKETBALL_TODAY(state, data) {
    data = data.data;

    this.commit(types.UNION_SPORTS_DATA, {
      dataName: data,
      merge: true,
      targetName: 'scsgInfo',
      dataMatchId: 'event_id'
    });
  },

  [types.SET_SPORTS_TYPE](state, type) {
    state.currentSportsType = type;

    this.commit('SELECT_FIRST_MATCH_BY_SPORTS_TYPE');
  },
  [types.SET_MATCH_ID](state, matchId) {
    state.currentMatchId = matchId;
  },
};

export default {
  state: initState,
  getters,
  actions,
  mutations,
};
