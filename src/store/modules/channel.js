import api from '@/services/api'
import store from '@/store'

export default {
    namespaced: true,
    state: {
        channels: null,
        posts: {
            idChannel: null,
            posts: []
        },
        members: []
    },
    mutations: {
    	setChannels: (state, channels) => {
            state.channels = channels
        },
        setPosts: (state, posts) => {
    	    state.posts = posts
            store.dispatch('channel/getPostMember', posts.posts)
        },
        addPost: (state, post) => {
    	    state.posts.posts.push(post)
        },
        deletePost: (state, idPost) => {
    	    state.posts.posts.find((element, key) => {
                if (element._id === idPost) {
                    state.posts.posts.splice(key, 1)
                    state.members.splice(key, 1)
                    return true
                }
            })
        },
        getPostMember: (state, member) => {
    	    state.members.push(member)
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
        },
        getMembers: (state) => {
            return state.members
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
        },
        getPostMember: ({ commit }, posts) => {
            for (let i = 0; i < posts.length; i++) {
                api.get('/api/members/' + posts[i].member_id + '/signedin')
                    .then((response) => {
                        commit('getPostMember', response.data)
                    }).catch((error) => {
                    console.log(error)
                    })
            }
        }
    }
}