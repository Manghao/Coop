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
			console.log("Connexion réussie !")
			this.$router.push("/")
		},
		logout: () => {
			localStorage.removeItem('auth');
			session.connected = false
			session.user = {}
			console.log('Déconnexion réussi avec succès !')
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
				console.log(error)
			})
		},
		logout: ({ commit }) => {
			commit('logout')
		}
	}
}