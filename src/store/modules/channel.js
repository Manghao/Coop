import Vue from 'vue'
import api from '@/services/api'
import router from '@/router'

export default {
    namespaced: true,
    state: {
        linkActive: 0,
        channels: null,
        current: {
            posts: []
        },
        members: []
    },
    mutations: {
        setLinkActive: (state, key) => {
            state.linkActive = key
        },
        addChannel: (state, channel) => {
            state.channels.push(channel)
            router.push({
                name: 'index'
            })
        },
        setChannels: (state, channels) => {
            for (let i = 0; i < channels.length; i++) {
                api.get('/api/channels/' + state.channels[i]._id)
                    .then((response) => {
                        Vue.set(channels[i], 'member_id', response.data.member_id)
                    }).catch((error) => {
                        console.log(error)
                    })
            }
            state.channels = channels
        },
        setChannel: (state, data) => {
            state.channels.splice(state.channels.indexOf(data.oldChannel), 1, data.newChannel)
            router.push({
                name: 'index'
            })
        },
        deleteChannel: (state, channel) => {
            state.channels.splice(state.channels.indexOf(channel), 1)
        },
        addPost: (state, post) => {
            if (!state.current.posts) {
                state.current = {
                    posts: []
                }
            }
            state.current.posts.push(post)
        },
        setPost: (state, data) => {
            state.current.posts.splice(state.current.posts.indexOf(data.oldPost), 1, data.newPost)
        },
        deletePost: (state, post) => {
            state.current.posts.splice(state.current.posts.indexOf(post), 1)
            if (state.current.posts.length === 0)
                state.current.posts = []
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
        addChannel: ({ commit }, credentials) => {
            api.post('/api/channels', credentials)
                .then((response) => {
                    commit('addChannel', response.data)
                }).catch((error) => {
                    console.log(error)
                })
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
                }).catch((error) => {
                    console.log(error)
                })
        },
        setChannel: ({ commit }, credentials) => {
            api.put('/api/channels/' + credentials.oldChannel._id, credentials)
                .then((response) => {
                    commit('setChannel', { oldChannel: credentials.oldChannel, newChannel: response.data})
                }).catch((error) => {
                    console.log(error)
                })
        },
        deleteChannel: ({ commit }, channel) => {
            api.delete('/api/channels/' + channel._id)
                .then((response) => {
                    commit('deleteChannel', channel)
                }).catch((error) => {
                    console.log(error)
                })
        },
        addPost: ({ commit, state }, credentials) => {
            api.post('/api/channels/' + state.current._id + '/posts', credentials)
                .then((response) => {
                    commit('addPost', response.data)
                }).catch((error) => {
                    console.log(error)
                })
        },
        setPost: ({ commit }, credentials) => {
            api.put('api/channels/' + credentials.post.channel_id + '/posts/' + credentials.post._id, { message: credentials.messageEdit })
                .then((response) => {
                    commit("setPost", { oldPost: credentials.post, newPost: response.data })
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
                }).catch((error) => {
                    console.log(error)
                })
        },
        getPostMember: ({ commit }, member_id) => {
            commit('getPostMember', member_id)
        }
    }
}