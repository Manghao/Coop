import api from '../../services/api'
import router from '../../router'

export default {
    namespaced: true,
    state: {
        session: null
    },
    mutations: {
    	registration: () => {
    		router.push({
                name: 'login'
            })
		},
        signin: (state, data) => {
            let user = {
                _id: data._id,
                fullname: data.fullname,
                email: data.email,
                password: data.password,
                token: data.token
            }
            state.session = {
                user: user
            }
            localStorage.setItem('token', data.token)
            console.log("Connexion réussie !")
            router.push({
                name: 'index'
            })
        },
        logout: () => {
            localStorage.removeItem('auth')
            session.connected = false
            session.user = {}
            console.log('Déconnexion réussi avec succès !')
            router.push({
                name: 'login'
            })
        }
    },
    getters: {
        getSession: (state) => {
            return state.session
        }
    },
    actions: {
        register: ({ commit }, credentials) => {
            console.log(credentials);
            api.post('/api/members', credentials)
                .then((response) => {
                    console.log('Inscription réussie !')
					commit('registration')
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