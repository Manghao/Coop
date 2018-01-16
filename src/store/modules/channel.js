import api from '@/services/api'
import ls from '@/services/ls'
import router from '@/router'

export default {
    namespaced: true,
    state: {
        channels: null,
        posts: null
    },
    mutations: {
    	setChannels: (state, channels) => {
            state.channels = channels
        },
        setPosts: (state, idChannel, posts) => {
    	    state.posts = {
    	        idChannel: idChannel,
    	        posts: posts
            }
        }
    },
    getters: {
        getChannels: (state) => {
            return state.channels
        },
        getChannel: (state, id) => {
            return state.channels
        },
        getPosts: (state) => {
            return state.posts
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
        },
        channelPosts: ({ commit }, idChannel) => {
            api.get('/api/channels/' + idChannel + '/posts')
                .then((response) => {
                    commit('setPosts', idChannel, response.data)
                }).catch((error) => {
                    console.log(error)
                })
        }
    }
}