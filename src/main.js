import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import { router } from './router.js';
import { store } from './store/store.js'

Vue.use(VueResource);

// Currency format filter for ui
Vue.filter("currency", (value) => {
  return parseFloat(value).toLocaleString(undefined, { minimumFractionDigits: 2 }) + " USD"
})

// Create a new vue instance with store and router
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
