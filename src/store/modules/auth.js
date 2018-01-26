import api from '@/services/api'
import ls from '@/services/ls'
import router from '@/router'

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
            state.session = data
            ls.set('token', data.token)
            console.log("Connexion réussie !")
            router.push({
                name: 'index'
            })
        },
        logout: (state) => {
            state.session = null
            ls.remove('token')
            console.log('Déconnexion réussie !')
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
        registration: ({ commit }, credentials) => {
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
            api.delete('/api/members/signout')
                .then((response) => {
                    commit('logout')
                }).catch((error) => {
                    console.log(error)
                })
        },
        deleteAccount: ({ commit }, member) => {
            api.delete('/api/members/' + member._id)
                .then((response) => {
                    console.log(response)
                }).catch((error) => {
                    console.log(error)
                })
        }
    }
}