import App from './App.vue';
import router from './router';

Object.defineProperty(Vue.prototype, 'consts', {value: consts});
Object.defineProperty(Vue.prototype, '_result', {value: _.result});

export default new Vue({
  el: '#app',
  render: h => h(App),
  router,
});
