import Vue from 'vue'
import Vuex from 'vuex'
import api from '../services/api'
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
				Materialize.toast('Inscription réussi avec succès !', 3000)
			})
			.catch((error) => {
				error.response.data.error.forEach ((e) => {
					Materialize.toast(e[0], 3000)
				})
			})
		}
	}
})
