import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/services/api'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		auth
	},
	state: { },
	mutations: { },
	getters: { },
	actions: { 
		registration: ({commit}, credentials) => {
			api.post('/api/members', credentials)
			.then((response) => {
				console.log('Inscription réussie !')
			})
			.catch((error) => {
				console.log(error)
			})
		}
	}
})
