import React, { useState, useEffect, useCallback } from 'react'
import Header from './Header'
import Room from './Room'
import Invitations from './Invitations'
import Chats from './Chats'
import TextInputBox from './TextInputBox'
import WebSocketProvider from '../library/WebSocketProvider'
import * as Auth from '../services/Auth'

import { myToken } from '../modules/token'
import { useRecoilState, useRecoilCallback } from 'recoil'

const App = props => {
	const [userInfo, setUserInfo] = useState({
										user: {
											id: '',
											name: ''
										}
									})
	const [message, setMessage] = useState(null)
	const [isLogin, setIsLogin] = useState(false)
	
	const [token, setToken] = useRecoilState(myToken)

	const fetchUserAuth = useRecoilCallback(({set}) => async () => {
		let fetchData = {}

		try {
			fetchData = await Auth.validate(token)
		} catch(error) {
			console.warn(error)
			return
		}

		if (fetchData.status !== 200 || fetchData.data.code !== '0000') {
			clearLoginData()
			return
		}
		
		const accessToken = fetchData.data.accessToken

		if (accessToken && accessToken !== token) {
			setToken(accessToken)
		}
		setUserInfo({
			user: fetchData.data.userInfo
		})
	}, [isLogin])

	const clearLoginData = useRecoilCallback(({set}) => () => {
		setUserInfo({
			user: {
				id: '',
				name: ''
			}
		})
		setIsLogin(false)
		setToken('')
	}, [isLogin])

	const handleMessageUpdate = (data) => {
		setMessage(data)
	}
///////////////////test
	const handleToken = async () => {
		const fetchData = await fetchUserAuth(token)

		const accessToken = fetchData.result.accessToken

		if (accessToken && accessToken !== token) {
			setToken(accessToken)
			console.log('token change')
		}
	}
/////////////////
	const hello = useCallback(async () => {
		let fetchData = {}

		try {
			fetchData = await Auth.hello()
		} catch(error) {
			console.warn(error)
			return
		}

		if (fetchData.data.code === '0000') {
			setIsLogin(true)
		}
	}, [])

	useEffect(() => {
		if (isLogin) {
			fetchUserAuth()
		} else {
			clearLoginData()
		}
	}, [clearLoginData, fetchUserAuth, isLogin])
	//페이지 열릴시 한번만 실행
	//유저가 로그인 유지상태인지 확인 후 isLogin 플래그 변경
	useEffect(hello, [hello])

	return (
		<div>
			<Header 
				user={userInfo.user}
				isLogin={isLogin}
				setIsLogin={setIsLogin}
				clear={clearLoginData}
			/>
			<div onClick={handleToken}>token : { token }</div>
			<WebSocketProvider
				flag={isLogin}
				onMessage={handleMessageUpdate}
			>
				{ isLogin && (
				<div>
					<Room />
					<Chats
						name={userInfo.user.name}
						item={message}
					/>
					<TextInputBox
						name={userInfo.user.name}
						onMessage={handleMessageUpdate}
					/>
				</div>
				) }
			</WebSocketProvider>
			<Invitations/>
		</div>
	)
}

export default App