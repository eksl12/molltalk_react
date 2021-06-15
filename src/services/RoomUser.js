import axios from '../library/axios'

export function create(params) {
	return axios.post('/room/user', params)
	.then((response) => {
		return response
	})
}