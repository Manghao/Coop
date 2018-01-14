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
    	registration: (data) => {
    		this.$router.push({
				path: '#/login',
				query: { email: data.email }
			});
		},
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
            console.log(this);
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
        register: ({ commit }, credentials) => {
            console.log(credentials);
            api.post('/api/members', credentials)
                .then((response) => {
					commit('registration', response.data)
                }).catch((error) => {
                	console.log(error.response.data.error[0][0])
                })
        },
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