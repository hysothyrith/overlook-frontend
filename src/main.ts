import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VModal from "vue-js-modal";
import Notifications from "vue-notification";

import "./assets/css/normalize.css";
import "./assets/css/global.css";
import store from "@/store";

require("./store/subscriber");

axios.defaults.baseURL = process.env.VUE_APP_AXIOS_DEFAULT_BASE_URL;

Vue.config.productionTip = false;
Vue.use(VModal);
Vue.use(Notifications);

store.dispatch("auth/attemptReauthentication");

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
