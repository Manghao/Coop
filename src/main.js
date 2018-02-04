// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import interceptors from '@/services/interceptors'
import moment from 'moment'
import VueChatScroll from 'vue-chat-scroll'
import BootstrapVue from 'bootstrap-vue'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(interceptors, {
	router
})
Vue.use(VueChatScroll)
Vue.use(BootstrapVue)

Vue.filter('formatDate', (value) => {
    if (value) {
        return moment(String(value)).format('MM/DD/YYYY HH:mm')
    }
})

require('../node_modules/font-awesome/css/font-awesome.min.css')
require('../node_modules/bootstrap-vue/node_modules/bootstrap/dist/css/bootstrap.min.css')
require('../node_modules/simplemde/dist/simplemde.min.css')
require('../node_modules/highlight.js/styles/atom-one-dark.css')
require('../node_modules/vue-chat-scroll/dist/vue-chat-scroll.js')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
