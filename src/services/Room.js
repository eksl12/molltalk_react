import axios from '../library/axios'

export function create() {
	return axios.post('/room')
	.then((response) => {
		return response
	})
}