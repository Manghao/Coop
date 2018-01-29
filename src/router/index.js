import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/user/Login'
import Register from '@/components/user/Register'
import Index from '@/components/app/Index'
import Channel from '@/components/channel/View'
import AddChannel from '@/components/channel/AddChannel'
import Members from '@/components/member/Members'

import store from '@/store/index'

Vue.use(Router)

const router = new Router({
	routes: [
		{ 
			name: "login",
			path: '/login', 
			component: Login
 		},
		{ 
			name: "registration",
			path: '/registration', 
			component: Register
		},
		{
			name: 'index',
			path: '/',
			component: Index
		},
		{
			name: 'channel',
			path: '/:channel_id',
			component: Channel
		},
		{
			name: 'addChannel',
			path: '/addChannel',
			component: AddChannel
		},
		{
			name: 'members',
			path: '/members',
			component: Members
		}
	]
})

router.beforeEach((to, from, next) => {
	if (to.name !== 'login' && to.name !== 'registration' && !store.getters['auth/getSession']) {
		next({ name: 'login' })
	} else if (to.name === 'login' && store.getters['auth/getSession']) {
		next({ name: 'index' })
	} else {
		next()
	}
})
export default router