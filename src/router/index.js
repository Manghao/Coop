import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/user/Login'
import Register from '@/components/user/Register'
import Index from '@/components/app/Index'

import store from '@/store/index'

Vue.use(Router)

const router = new Router({
	mode: 'history',
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
		}
	]
})

router.beforeEach((to, from, next) => {
	if (to.name != 'login' && !store.getters['auth/getSession']) {
		next({ name: 'login' })
	} else if (to.name == 'login' && store.getters['auth/getSession']) {
		next({ name: 'index' })
	} else {
		next()
	}
})

export default router