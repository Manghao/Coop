// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

Vue.use(Vuelidate)

require('../node_modules/materialize-css/dist/css/materialize.min.css')
require('../node_modules/font-awesome/css/font-awesome.min.css')
require('../node_modules/jquery/dist/jquery.min.js')
require('../node_modules/materialize-css/dist/js/materialize.min.js')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
