import VueNativeSock from 'vue-native-websocket';

export const install = (store) => {
    Vue.use(VueNativeSock, `wss://push.${_.getFirstLevelDomain()}:9102`, {
      store: store,
      format: 'json',
      reconnection: true, // (Boolean) whether to reconnect automatically (false)
      reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
      reconnectionDelay: 3000,
    });
};
