import * as ws from '@/consts/ws';

const initState = () => {
  return {
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false,
    },
    subscribeList: [],
    hasUnsubscribe: false,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  };
};

const getters = {
};

// actions
const actions = {
};

// mutations
const mutations = {
  /**
   * 订阅
   * @param state
   * @param props
   * @constructor
   */
  SOCKET_SUBSCRIBE(state, props) {
    if (!_.isObject(props)) {
      props = {
        channelName: props
      };
    }

    if (!_.includes(state.subscribeList, props.channelName)) {
      state.subscribeList.push({
        ...props,
        isSubscribed: false
      });

      state.hasUnsubscribe = true;

      this.commit('$_SOCKET_SUBSCRIBE');
    }
  },

  $_SOCKET_SUBSCRIBE (state) {
    if (state.hasUnsubscribe && state.socket.isConnected) {

      const channelList = _(state.subscribeList).filter({
        isSubscribed: false
      }).map(info => {
        info.isSubscribed = true;
        return info;
      }).value();

      _.each(channelList, channelInfo => {
        let msg = {
          cmd: 'subscribe',
          channel: [channelInfo.channelName],
          ...channelInfo.opts
        };

        msg = JSON.stringify(msg);

        // console.log(msg);
        Vue.prototype.$socket.send(msg);
      });
    }
  },

  /**
   * 取消订阅
   * @param state
   * @param channelNameList
   */
  SOCKET_UNSUBSCRIBE (state, channelNameList) {
    if (state.socket.isConnected) {
      if (!_.isArray(channelNameList)) {
        channelNameList = [channelNameList];
      }

      const channelList = _(state.subscribeList).filter({
        isSubscribed: true
      })
        .intersectionWith(channelNameList, (subscribeInfo, channelName) => {
          return subscribeInfo.channelName === channelName;
        })
        .map(info => {
          info.isSubscribed = false;
          return info;
      }).value();

      _.each(channelList, channelInfo => {
        let msg = {
          cmd: 'unsubscribe',
          channel: [channelInfo.channelName],
          ...channelInfo.opts
        };

        msg = JSON.stringify(msg);

        // console.log(msg);
        Vue.prototype.$socket.send(msg);
      });

      state.subscribeList = _.pullAll(state.subscribeList, channelList);
    }
  },

  /**
   * 取消需要登录的订阅
   * @param state
   * @constructor
   */
  SOCKET_LOGOUT_UNSUBSCRIBE (state) {
    if (state.socket.isConnected) {
      const channelList = _(state.subscribeList).filter({
        isSubscribed: true,
        needLogin: true
      })
        .map(info => {
          info.isSubscribed = false;
          return info;
        }).value();

      _.each(channelList, channelInfo => {
        let msg = {
          cmd: 'unsubscribe',
          channel: [channelInfo.channelName],
          ...channelInfo.opts
        };

        msg = JSON.stringify(msg);

        // console.log(msg);
        Vue.prototype.$socket.send(msg);
      });

      state.subscribeList = _.pullAll(state.subscribeList, channelList);
    }
  },

  SOCKET_ONOPEN (state, event)  {
    Vue.prototype.$socket = event.currentTarget;
    state.socket.isConnected = true;

    this.commit('$_SOCKET_SUBSCRIBE');
  },
  SOCKET_ONCLOSE (state, event)  {

    _.each(state.subscribeList, subscribe => {
      subscribe.isSubscribed = false;
    });

    state.socket.isConnected = false;

    console.error('ws close', event);
  },
  SOCKET_ONERROR (state, event)  {
    console.error('ws error', event);
  },
  // default handler called for all methods
  SOCKET_ONMESSAGE (state, message)  {
    _.find(ws, (value, prop) => {
      if (Number(message.chId) === value) {
        this.commit(`${state.mutationPrefix}${prop}`, _.result(message, 'data'));
      }
    });

    state.socket.message = message;
  },
  // mutations for reconnect methods
  SOCKET_RECONNECT(state, count) {
    this.commit('$_SOCKET_SUBSCRIBE');
  },
  SOCKET_RECONNECT_ERROR(state) {
    console.log('ws open');
    state.socket.reconnectError = true;
  },
};

export default {
  state: initState,
  getters,
  actions,
  mutations,
};
