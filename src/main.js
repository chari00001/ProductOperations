import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import { router } from './router.js';
import { store } from './store/store.js'

Vue.use(VueResource);

/****** Shows Purchase, Sale and Balance numbers as currency ******/
Vue.filter("currency", (value) => {
  return parseFloat(value).toLocaleString(undefined, { minimumFractionDigits: 2 }) + " USD"
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
