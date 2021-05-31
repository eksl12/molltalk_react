import React, { Component } from 'react';

class Room extends Component {
	static defaultProps = {
		room: {
			no: 0,
			name: '기본값',
			users: 0
		}
	}

	state = {
		editing: false,
		name: '',
		users: ''
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (!this.state.editing
			&& !nextState.editing
			&& this.props.room === nextProps.info) {
			return false
		}

		return true
	}

	handleRemove = () => {
		const { room, onRemove } = this.props
		onRemove(room.no)
	}

	handleToggleEdit = () => {
		const { editing } = this.state
		this.setState({ editing: !editing })
	}

	handleChange = (e) => {
		const { name, value } = e.target
		this.setState({
			[name]: value
		})
	}

	componentDidUpdate(prevProps, prevState) {
		const { room, onUpdate } = this.props
		if (!prevState.editing && this.state.editing) { 
			this.setState({
				name: room.name,
				users: room.users
			})
		}

		if (prevState.editing && !this.state.editing) {
			onUpdate(room.no, {
				name: this.state.name,
				users: this.state.users
			})
		}
	}

	render() {
		const { editing } = this.state

		if (editing) {
			return (
				<div>
					<div>
						<input
							value={this.state.name}
							name="name"
							placeholder="이름"
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<input
							value={this.state.users}
							name="users"
							placeholder="참여유저수"
							onChange={this.handleChange}
						/>
					</div>
					<button onClick={this.handleToggleEdit}>적용</button>
					<button onClick={this.handleRemove}>삭제</button>
				</div>
			)
		}

		const { name, users } = this.props.room

		return (
			<div>
				<div>{name}</div>
				<div>{users}</div>
				<button onClick={this.handleToggleEdit}>수정</button>
				<button onClick={this.handleRemove}>삭제</button>
			</div>
		)
	}
}

export default Room;