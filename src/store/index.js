import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/services/api'
import auth from './modules/auth'
import router from "../router";

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		auth
	},
	state: { },
	mutations: { },
	getters: { },
	actions: { }
})
