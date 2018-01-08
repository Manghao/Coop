import api from '../../services/api'

const session = {
	connected: false,
	user: {}
}

export default {
	namespaced: true,
	state: { 
		session: null
	},
	mutations: { 
		signin: (state, data) => {
			session.connected = true
			session.user = {
				_id: data._id,
				fullname: data.fullname,
				email: data.email,
				password: data.password,
				token: data.token
			}
			state.session = session
			localStorage.setItem('auth', JSON.stringify(session));
			Materialize.toast('Connexion réussi avec succès !', 3000)
			this.$router.push("/")
		},
		logout: () => {
			localStorage.removeItem('auth');
			session.connected = false
			session.user = {}
			Materialize.toast('Déconnexion réussi avec succès !', 3000)
			this.$router.push("/login")
		}
	},
	getters: { 
		getSession: (state) => () => {
			return state.session
		}
	},
	actions: { 
		login: ({ commit }, credentials) => {
			api.post('/api/members/signin', credentials)
			.then((response) => {
				commit('signin', response.data)
			}).catch((error) => {
				Materialize.toast(error.response.data.error, 3000)
			})
		},
		logout: ({ commit }) => {
			commit('logout')
		}
	}
}