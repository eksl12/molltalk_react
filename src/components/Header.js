import React, { Component } from 'react'
import '../css/Header.css'
import * as User from '../services/User'

class Header extends Component {
	constructor(props) {
		super(props)

		this.state = {
			params: {
				id: '',
				name: '',
				password: ''
			},
			registMode: false
		}
	}


	handleToggleRegister = (e) => {
		const toggledMode = !this.state.registMode
		this.setState({
			registMode: toggledMode
		})
	}

	handleChange = (e) => {
		const { name, value } = e.target

		this.setState({
			params: {
				...this.state.params,
				[name]: value
			}
		})
	}

	doRegist = async (e) => {
		e.preventDefault()

		const params = this.state.params
		let fetchData = {}

		try {
			fetchData = await User.regist(params)
			if (fetchData.data.code === '0000') {
				this.setState({
					params: {
						id: '',
						name: '',
						password: ''
					},
					registMode: false
				})

				alert('회원가입 성공')
			} else {
				alert('회원가입 실패')
			}
		} catch(error) {
			alert('회원가입 실패')
		}
	}

	doLogin = async (e) => {
		e.preventDefault()

		const params = this.state.params
		let fetchData = {}

		try {
			fetchData = await User.login(params)
			if (fetchData.data.code === '0000') {
				this.setState({
					params: {
						id: '',
						name: '',
						password: ''
					},
					registMode: false
				})

				this.props.setIsLogin(true)

				alert('로그인 성공')
			} else {
				alert('로그인 실패')
			}
		} catch(error) {
			console.warn(error)
			alert('로그인 실패')
		}
	}

	doLogout = async () => {
		try {
			const fetchData = await User.logout()
			if (fetchData.data.code === '0000') {
				this.props.setIsLogin(false)
			}
		} catch(error) {
			console.warn(error)
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.state !== nextState || this.props.user !== nextProps.user) {
			return true
		}

		return false;
	}


	render() {
		const {id, name, password } = this.state.params
		const user = this.props.user
		const registerContent = 
		<div>
			<form onSubmit={this.doRegist}>
				<input
					name="id"
					value={id}
					placeholder="아이디"
					onChange={this.handleChange}
				/>
				<p/>
				<input
					name="name"
					value={name}
					placeholder="이름"
					onChange={this.handleChange}
				/>
				<p/>
				<input
					type="password"
					name="password"
					value={password}
					placeholder="비밀번호"
					onChange={this.handleChange}
				/>
				<p/>
				<button>등록</button>
			</form>
		</div>
		const loginContent = 
			<div>
				<form onSubmit={this.doLogin}>
					<input
						name="id"
						value={id}
						placeholder="아이디"
						onChange={this.handleChange}
					/>
					<p/>
					<input
						type="password"
						name="password"
						value={password}
						placeholder="비밀번호"
						onChange={this.handleChange}
					/>
					<p/>
					<button>로그인</button>
				</form>
			</div>
		return(
			<div className="header">
				header
				{ !this.props.isLogin
				  ? (<button onClick={this.handleToggleRegister}>회원가입</button>)
				  : (user.name) }
				{ (!this.props.isLogin && this.state.registMode) && (registerContent) }
				{ (!this.props.isLogin && !this.state.registMode) && (loginContent) }
				{ this.props.isLogin && (<button onClick={this.doLogout}>로그아웃</button>) }
			</div>
		)
	}
}

export default Header