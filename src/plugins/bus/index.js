export default {
  install (Vue) {
    const bus = new Vue({});
    if (!Vue.prototype.$global) {
      Vue.prototype.$global = {
        bus
      };
    } else {
      Vue.prototype.$global.bus = bus;
    }
  }
};
