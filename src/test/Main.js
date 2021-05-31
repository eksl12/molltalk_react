import React, { Component } from 'react';
import './css/Main.css';

			
const Problematic = () => {
	throw new Error('error')
}

class Main extends Component {
	static defaultProps = {
		welcome: "welcome"
	}

	state = {
		number: 0,
		name: '',
		error: false
	}

	increase = (e) => {
		e.preventDefault()
		const { number } = this.state
		this.setState({
			number: number + 1
		})
	}

	decrease = (e) => {
		e.preventDefault()
		this.setState(
			({ number }) => ({
			number: number - 1
			})
		)
	}

	multiple = (e) => {
		e.preventDefault()
		this.setState({
			number: this.state.number * 2
		})
	}

	handleChange = (e) => {
		const value = e.target.value
		this.setState({
			[e.target.name]: value	//computed property names
		})
	}
	
	transferParent = (e) => {
		e.preventDefault()
		this.props.onCreate(this.state)

		this.setState({
			number: '',
			name: ''
		})
	}

	//에러발생시 lifeCycle api
	componentDidCatch(error, info) {
		console.log('error')
		this.setState({
			error: true
		})
	}

	render() {
		if (this.state.error) return (<div>error</div>)
		return (
			<div>
				{ !/^[0-9]*$/.test(this.state.number) && <Problematic /> }
				<div>{this.props.welcome}
				</div>
				<div>{this.state.number}</div>
				<div>{this.state.name}</div>
				<form onSubmit={this.transferParent}>
					<input 
						placeholder="숫자"
						name="number"
						value={this.state.number}
						onChange={this.handleChange}
					/>
					<input 
						placeholder="이름"
						name="name"
						value={this.state.name}
						onChange={this.handleChange}
					/>
					<button onClick={this.increase}>+</button>
					<button onClick={this.decrease}>-</button>
					<button onClick={this.multiple}>*</button>
					<div>
						<button type="submit">전송</button>
					</div>
				</form>
			</div>
		);
	}
}

export default Main;