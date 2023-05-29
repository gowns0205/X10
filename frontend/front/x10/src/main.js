import Vue from "vue";
// import axios from "axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin, CarouselPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(CarouselPlugin);
Vue.use(IconsPlugin);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
window.Kakao.init("09651b9375c278a081d69d1e64be8004");
