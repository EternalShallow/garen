import Vue from 'vue';
import router from './demo/router.js';
import App from './demo/App.vue';
import './tools/rem.js'
import './tools/reset.css'

import garen from './src/index.js'

Vue.use(garen)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})