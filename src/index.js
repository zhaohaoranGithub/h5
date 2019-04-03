import './boots';
import router from './routers';
import store from './store/index';
import App from './App.vue';
import {sync} from 'vuex-router-sync';
import {install} from 'build';
import Clipboard from 'clipboard';
// import {sendHead} from '@/services/logd';

import './mock';

install(Vue);

Object.defineProperty(Vue.prototype, 'consts', {value: consts});
Object.defineProperty(Vue.prototype, '_result', {value: _.result});


// sendHead();

sync(store, router);

Vue.config.productionTip = false;

new Clipboard('.clipboard-btn');

const Bus = new Vue();

window.$router = router;
let $vue =  new Vue({
  el: '#app',
  data:{
    Bus
  },
  render: h => h(App),
  store,
  router,
});
window.$vue = $vue;
export default $vue;
