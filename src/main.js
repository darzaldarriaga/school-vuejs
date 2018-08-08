import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//TODO change to a centralized route later on
import router from './routes/routes'

//TODO change to a centralized store later on
import {store} from "./store/main.store";

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
