import { atom } from 'recoil'

export const chatState = atom({
	key: 'chat',
	default: []
})