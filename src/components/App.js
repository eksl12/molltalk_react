import React, { useState, useEffect } from 'react'
import Header from './Header'
import Room from './Room'
import Invitations from './Invitations'
import Chats from './Chats'
import TextInputBox from './TextInputBox'
import WebSocketProvider from '../library/WebSocketProvider'
import * as User from '../services/User'

import { chatState } from '../modules/chat'
import { useRecoilState } from 'recoil'

const App = props => {
	const [userInfo, setUserInfo] = useState({
										token: '',
										isLogin: false,
										user: {
											no: '',
											id: '',
											name: ''
										}
									})
	const [message, setMessage] = useState(null)

	const handleUserState = (data) => {
		const user = data.data
		const token = data.accessToken || ''

		setUserInfo({
			token: token || userInfo.token,
			isLogin: true,
			user: user
		})
	}

	const fetchUserAuth = async (token) => {
		let fetchData = {}

		try {
			fetchData = await User.check(token)

			if (fetchData.status === 200) {
				return fetchData.data
			} else {
				return { code: 9999 }
			}
		} catch(error) {
			console.warn(error)
			
			return { code: 9999 }
		}
	}

	const clearLoginData = () => {
		setUserInfo({
			token: '',
			isLogin: false,
			user: {
				no: '',
				id: '',
				name: ''
			}
		})
	}

	const handleMessageUpdate = (data) => {
		let chatLength = 0

		if (data.type === 'CHAT') {
			if (Array.isArray(data.content)) {
				chatLength = data.content.length
				console.log('chatLength : ' + chatLength)
			} else {
				chatLength = 1
			}
		}

		setMessage(data)
	}

	useEffect(async () => {
		const fetchData = await fetchUserAuth(userInfo.token)
		if (fetchData.code === '0000') {
			//새로고침시 userInfo없음, token만료시 userInfo와 발급 토큰 상이함(추후 api-auth수정 예정
			if (!userInfo.isLogin) {
				setUserInfo({
					isLogin: true,
					token: fetchData.result.accessToken,
					user: fetchData.result.data
				})
			}
		} else {
			if (userInfo.isLogin) {
				setUserInfo({
					isLogin: false,
					token: '',
					user: {
						no: '',
						id: '',
						name: ''
					}
				})
			}
		}
	}, [userInfo])

	return (
		<div>
			<Header 
				user={userInfo.user}
				token={userInfo.token}
				isLogin={userInfo.isLogin}
				onLogin={handleUserState}
				clear={clearLoginData}
			/>
			{ userInfo.isLogin && (
			<WebSocketProvider onMessage={handleMessageUpdate}>
				<Room />
				<Chats
					name={userInfo.user.name}
					item={message}
				/>
				<TextInputBox
					name={userInfo.user.name}
					onMessage={handleMessageUpdate}
				/>
			</WebSocketProvider>
			) }
			<Invitations/>
		</div>
	)
}

export default App

/*
import React, { Component } from 'react'
import Header from './Header'
import Room from './Room'
import Invitations from './Invitations'
import Chat from './Chat'
import TextInputBox from './TextInputBox'
import WebSocketProvider from '../library/WebSocketProvider'
import * as User from '../services/User'

import { chatState } from '../modules/chat'
import { useRecoilState } from 'recoil'

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			token: '',
			isLogin: false,
			user: {
				no: '',
				id: '',
				name: ''
			}, 
			chatAmount: 0,
			message: null
		}
	}

	handleUserState = (data) => {
		const user = data.data
		const token = data.accessToken || ''
		this.setState({
			token: token,
			isLogin: true,
			user: user
		})
	}

	checkUserAuth = async () => {
		let fetchData = {}

		try {
			fetchData = await User.check(this.state.token)

			if (fetchData.data.code === '0000') {
				this.handleUserState(fetchData.data.result)
			}
		} catch(error) {
			console.warn(error)
		}
	}

	clearLoginData = () => {
		this.setState({
			token: '',
			isLogin: false,
			user: {
				no: '',
				id: '',
				name: ''
			}
		})
	}

	handleMessageUpdate = (data) => {
		let chatLength = 0

		if (data.type === 'CHAT') {
			if (Array.isArray(data.content)) {
				chatLength = data.content.length
				console.log('chatLength : ' + chatLength)
			} else {
				chatLength = 1
			}
		}

		this.setState({
			message: data
		})

		if (data.length !== this.state.chatAmount
			&& data.name !== this.state.user.name) {
			this.setState({
				chatAmount: this.state.chatAmount + chatLength
			})
		}
	}

	componentDidMount(prevProps, prevState, snapshop) {
		if (!prevProps || this.props.user !== prevProps.user) {
			this.checkUserAuth()
		}
	}

	render() {
		const [chat, setChat] = useRecoilState(chatState)
		const chg = () => {
			setChat(chat + 1)
		}
		return (
			<div>
				<div onClick={chg}>
					{chat}
				</div>
				<Header 
					user={this.state.user}
					token={this.state.token}
					isLogin={this.state.isLogin}
					onLogin={this.handleUserState}
					clear={this.clearLoginData}
				/>
				{ this.state.isLogin && (
				<WebSocketProvider onMessage={this.handleMessageUpdate}>
					<Room />
					<Chat
						name={this.state.user.name}
						item={this.state.message}
					/>
					<TextInputBox
						name={this.state.user.name}
						length={this.state.chatAmount}
						onMessage={this.handleMessageUpdate}
					/>
				</WebSocketProvider>
				) }
				<button onClick={this.checkUserAuth}>로그인 확인 테스트 버튼</button>
				<Invitations/>
			</div>
		)
	}
}
*/