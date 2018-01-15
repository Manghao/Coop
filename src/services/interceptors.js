import Vue from 'vue'
import api from '@/services/api'
import ls from '@/services/ls'
import store from '@/store/index'

export default {
	install: (Vue, options = {}) => {

		api.interceptors.request.use(function (config) {
			if (ls.get('token')) {
				if (!config.params) {
					config.params = {}
				}
				config.params.token = ls.get('token')
			}

			return config
		}, function (error) {
			return Promise.reject(error)
		})

		api.interceptors.response.use(function (response) {
			return response
		}, function (error) {
			if (error.response && error.response.status == 401) {
				options.router.push({ name: 'login' })
			}
			return Promise.reject(error)
		})
	}
}