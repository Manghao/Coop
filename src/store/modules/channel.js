import api from '@/services/api'
import store from '@/store'

export default {
    namespaced: true,
    state: {
        linkActive: 0,
        channels: null,
        posts: {
            idChannel: null,
            posts: []
        },
        members: []
    },
    mutations: {
        setLinkActive: (state, key) => {
            state.linkActive = key
        },
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
            state.posts.posts.forEach((post, keyPost) => {
                if (post._id === idPost) {
                    state.posts.posts.splice(keyPost, 1)
                    return true
                }
            })
        },
        getPostMember: (state, member_id) => {
            state.members.forEach((member) => {
                if (member._id === member_id) {
                    return member.fullname
                }
            })
        },
        setMembers: (state, members) => {
            state.members = members
        }
    },
    getters: {
        getLinkActive: (state) => {
            return state.linkActive
        },
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
        setLinkActive: ({ commit }, key) => {
            commit('setLinkActive', key)
        },
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
        members: ({commit}) => {
            api.get('/api/members')
                .then((response) => {
                    commit('setMembers', response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        getPostMember: ({ commit }, member_id) => {
            commit('getPostMember', member_id)
        }
    }
}