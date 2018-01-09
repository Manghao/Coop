import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/user/Login'
import Register from '@/components/user/Register'
import Index from '@/components/app/Index'

import store from '../store/index'

Vue.use(Router)

const router = new Router({
	routes: [
		{ 
			name: "login",
			path: '/login', 
			component: Login,
			meta: {
				requiresAuth: false
			}
 		},
		{ 
			name: "registration",
			path: '/registration', 
			component: Register,
			meta: {
				requiresAuth: false
			}
		},
		{
			name: 'index',
			path: '/',
			component: Index,
			meta: {
				requiresAuth: true
			}
		}
	]
})

/*router.beforeEach((to, from, next) => {
	let auth = JSON.parse(localStorage.getItem('auth'))
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (auth != null) {
			if (auth.connected) {
				next()
			} else {
				next('/login')
			}
		}
	} else {
		next('/login')
	}
})*/

export default router