import Vue from 'vue';
import router from './demo/router.js';
import App from './demo/App.vue';
import './tools/rem.js'
import './tools/reset.css'

import garen,{Loadmore} from './src/index.js'

Vue.use(garen)

// import {Loadmore} from './src/index.js'
// Vue.component('garen-loadmore',Loadmore)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})