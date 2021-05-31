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
		console.log(response)
		return response
	})
}

export function check(token) {
	if (token) {
		console.log(token)
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
	}

	return axios.get('/auth/check')
	.then((response) => {
		console.log(response)
		return response
	})
}

export function logout() {
	return axios.get('/auth/logout')
	.then((response) => {
		console.log(response)
		return response
	})
}

export function findById(params) {
	return axios.get(`/user/${params}`)
	.then((response) => {
		console.log(response)
		return response
	})
}