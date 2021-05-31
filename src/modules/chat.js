import { atom, selector } from 'recoil'

export const chatState = atom({
	key: 'chat',
	default: []
})