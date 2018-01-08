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
			path: '/', 
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
			path: '/index',
			component: Index,
			meta: {
				requiresAuth: true
			}
		}
	]
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		let auth = localStorage.getItem('auth');
		if (!auth.session.connected) {
			next('/login')
		} else {
			next()
		}
	} else {
		next()
	}
})

export default router