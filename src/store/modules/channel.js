import api from '@/services/api'
import store from '@/store'

export default {
    namespaced: true,
    state: {
        linkActive: 0,
        channels: null,
        current: null,
        members: []
    },
    mutations: {
        setLinkActive: (state, key) => {
            state.linkActive = key
        },
        setChannels: (state, channels) => {
            state.channels = channels
        },
        addPost: (state, post) => {
            state.current.posts.push(post)
        },
        deletePost: (state, post) => {
            state.current.posts.splice(state.current.posts.indexOf(post), 1)
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
        },
        setCurrent: (state, data) => {
            state.current = data
        }
    },
    getters: {
        getLinkActive: (state) => {
            return state.linkActive
        },
        getChannels: (state) => {
            return state.channels
        },
        getChannel: (state) => {
            return state.current
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
        channel({ commit }, id) {
            api.get('/api/channels/' + id)
                .then((response) => {
                    commit('setCurrent', response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        addPost: ({ commit, state }, credentials) => {
            console.log(credentials)
            api.post('/api/channels/' + state.current._id + '/posts', credentials)
                .then((response) => {
                    commit('addPost', response.data)
                }).catch((error) => {
                    console.log(error)
                })
        },
        deletePost: ({ commit }, post) => {
            api.delete('/api/channels/' + post.channel_id + '/posts/' + post._id)
                .then((response) => {
                    commit('deletePost', post)
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