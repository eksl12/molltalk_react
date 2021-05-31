import axios from '../library/axios'

export function create(params) {
	return axios.post('/invitation', params)
	.then((response) => {
		console.log(response)
		return response
	})
}