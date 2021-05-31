import React, { Component } from 'react'
import * as User from '../services/User'
import UserFound from './UserFound'

class Room extends Component {
	state = {
		keyword: '',
		id: '',
		isFound: false
	}
	//setTimeout 제어용 멤버변수
	timer
	//검색 키워드 state에 저장
	handleChange = (e) => {
		const keyword = e.target.value

		this.setState({
			keyword: keyword
		})
		//계속 입력시 타이머 클리어처리
		clearTimeout(this.timer)
	}
	//검색된 이름 api통해 호출
	searchUser = async () => {
		const id = this.state.keyword
		
		try {
		//eslint-disable-next-line
		const fetchData = await User.findById(id)

		if (fetchData.data.code === '0000') {
			this.setState({
				id: fetchData.data.id,
				isFound: true
			})
		}

		} catch(error) {
			console.warn(error)
		}
	}
	//컴포넌트 변경시 호출
	shouldComponentUpdate(nextProps, nextState) {
		//키워드 변경시 타이머 작동 0.5초 후에 검색 실행
		if (this.state.keyword !== nextState.keyword) {
			this.timer = setTimeout(this.searchUser, 500)
		}

		return true
	}

	render() {

		return (
			<div>
				<input
					placeholder="유저 이름"
					value={this.state.keyword}
					onChange={this.handleChange}
				/>
				{ this.state.isFound && (<UserFound id={this.state.id} ws={this.props.ws}/>) }
			</div>
		)
	}
}

export default Room