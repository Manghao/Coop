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
                    Flash.success('Inscription réussie !', 3000)
                    console.log('Inscription réussie !')
					commit('registration')
                }).catch((error) => {
                    let err = error.response.data.error[0][0]
                    Flash.error(err, 3000)
                	console.log(err)
                })
        },
        login: ({ commit }, credentials) => {
            api.post('/api/members/signin', credentials)
                .then((response) => {
                    commit('signin', response.data)
                }).catch((error) => {
                    let err = error.response.data.error
                    Flash.error(err, 3000)
                	console.log(err)
                })
        },
        logout: ({ commit }) => {
            api.delete('/api/members/signout')
                .then((response) => {
                    commit('logout')
                    Flash.info('Vous êtes déconnecté', 3000)
                }).catch((error) => {
                    console.log(error)
                })
        },
        deleteAccount: ({ commit }, member) => {
            api.delete('/api/members/' + member._id)
                .then((response) => {
                    console.log(response)
                    Flash.success(`${member.fullname} supprimé`, 3000)
                }).catch((error) => {
                    console.log(error)
                })
        }
    }
}