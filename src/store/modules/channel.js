import api from '@/services/api'
import ls from '@/services/ls'
import router from '@/router'

export default {
    namespaced: true,
    state: {
        channels: null,
        posts: {
            idChannel: null,
            posts: []
        }
    },
    mutations: {
    	setChannels: (state, channels) => {
            state.channels = channels
        },
        setPosts: (state, posts) => {
    	    state.posts = posts
        },
        addPost: (state, post) => {
    	    state.posts.posts.push(post)
        },
        deletePost: (state, idPost) => {
    	    let index = state.posts.posts.find((element, key) => {
                if (element._id === idPost)
                    return key
            })
            state.posts.posts.splice(index, 1)
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
                    commit('setPosts', { idChannel: idChannel, posts: response.data })
                }).catch((error) => {
                    console.log(error)
                })
        },
        addPost: ({ commit }, credentials) => {
            api.post('/api/channels/' + credentials.idChannel + '/posts', credentials)
                .then((response) => {
                    commit('addPost', response.data)
                }).catch((error) => {
                    console.log(error)
                })
        },
        deletePost: ({ commit }, credentials) => {
            api.delete('/api/channels/' + credentials.idChannel + '/posts/' + credentials.idPost)
                .then((response) => {
                    commit('deletePost', credentials.idPost)
                }).catch((error) => {
                    console.log(error)
            })
        }
    }
}