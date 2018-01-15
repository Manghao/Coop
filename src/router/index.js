import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/user/Login'
import Register from '@/components/user/Register'
import Index from '@/components/app/Index'

import store from '@/store/index'

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
	console.log(store.getters['auth/getSession'])
	if (to.name == 'login' && store.getters['auth/getSession'] == null) {
		next({ name: 'login' })
	} else if (to.name == 'login' && store.getters['auth/getSession'] != null) {
		next({ name: 'index' })
	} else {
		next()
	}
})*/

export default router