import axios from '../library/axios'

export function regist(params) {
	return axios.post('/auth/register', params)
	.then((response) => {
		return response
	})
}

export function login(params) {
	return axios.post('/auth/login', params)
	.then((response) => {
		return response
	})
}

export function logout() {
	return axios.get('/auth/logout')
	.then((response) => {
		return response
	})
}

export function findById(params) {
	return axios.get(`/user/${params}`)
	.then((response) => {
		return response
	})
}