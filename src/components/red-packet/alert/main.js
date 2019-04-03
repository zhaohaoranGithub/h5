import Vue from 'vue';
import Main from './index.vue';
import router from "@/routers/app.routers";
import store from "@/store";

let alertConstructor = Vue.extend(Main);
let instance;
let instances = [];

const RedpacketAlert = function(options) {
    if (Vue.prototype.$isServer) return;
    options = options || {};
    instance = new alertConstructor({
        data: options,
        router,
        store,
    });
    instance.vm = instance.$mount();
    debugger
    document.body.appendChild(instance.vm.$el);
    instance.vm.visible = true;
    instance.dom = instance.vm.$el;
    instances.push(instance);
    return instance.vm;
}
export default RedpacketAlert;
