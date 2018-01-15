import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/services/api'
import auth from '@/store/modules/auth'
import router from "@/router"
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
	plugins: [createPersistedState()],
	modules: {
		auth
	},
	state: { },
	mutations: { },
	getters: { },
	actions: { }
})
