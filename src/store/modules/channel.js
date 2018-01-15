import api from '@/services/api'
import ls from '@/services/ls'
import router from '@/router'

export default {
    namespaced: true,
    state: {
        channels: null
    },
    mutations: {
    	setChannels: (state, channels) => {
            state.channels = channels
        }
    },
    getters: {
        getChannels: (state) => {
            return state.channels
        },
        getChannel: (state, id) => {
            return state.channels
        }
    },
    actions: {
        channels: ({ commit }) => {
            api.get('/api/channels')
                .then((response) => {
					commit('setChannels', response.data)
                }).catch((error) => {
                	console.log(error)
                })
        }
    }
}