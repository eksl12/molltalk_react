import axios from '../library/axios'

export function validate(token) {
	if (token !== '') {
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
	}

	return axios.get('/validation')
	.then((response) => {
		return response
	})
}

export function hello() {
	return axios.get('/hello')
	.then((response) => {
		return response
	})
}