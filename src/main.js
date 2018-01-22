// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import interceptors from '@/services/interceptors'
import moment from 'moment'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(interceptors, {
	router
})

Vue.filter('formatDate', (value) => {
    if (value) {
        return moment(String(value)).format('MM/DD/YYYY hh:mm')
    }
})

require('../node_modules/font-awesome/css/font-awesome.min.css')
require('../node_modules/bootstrap/dist/css/bootstrap.min.css')
require('../node_modules/simplemde/dist/simplemde.min.css')
require('../node_modules/highlight.js/styles/atom-one-dark.css')

require('../node_modules/jquery/dist/jquery.min.js')
require('../node_modules/popper.js/dist/popper.min.js')
require('../node_modules/bootstrap/dist/js/bootstrap.min.js')
require('../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
