import '@/utils/under-helper';
import router from './router';

import App from './App.vue';

export default new Vue({
  el: '#app',
  render: h => h(App),
  router,
});
