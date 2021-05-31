import React, { Component } from 'react';
import './css/App2.css'
import Header from './Header';
import Main from './Main';
import Rooms from './Rooms';

class App2 extends Component {
	no = 2
	state = {
		rooms: [
			{
				no: 0,
				name: '하하',
				users: 3
			},
			{
				no: 1,
				name: '호호',
				users: 4
			}
		],
		keyword: ''
	}

	handleChange = (e) => {
		this.setState({
			keyword: e.target.value
		})
	}

	//부모가 자식 Main의 state를 전달받음
	handleCreate = (data) => {
		const { rooms } = this.state
		this.setState({
			rooms: rooms.concat({ no: this.id++, name: data.name, users: data.number })
		})
	}

	handleRemove = (no) => {
		const { rooms } = this.state
		this.setState({
			rooms: rooms.filter(info => info.no !== no)
		})
	}

	handleUpdate = (no, data) => {
		const { rooms } = this.state
		this.setState({
			rooms: rooms.map(
				info => no === info.no
				? { ...info, ...data }
				: info
			)
		})
	}

	render() {
		const { rooms, keyword } = this.state
		const filteredList = rooms.filter(
			info => info.name.indexOf(keyword) !== -1
		)
		return (
			<div>
				<Header />
				<Main
					onCreate = {this.handleCreate}
					welcome="hello"  
				/> {/*props 전달 */}
				<p>
					<input
						placeholder="검색"
						onChange={this.handleChange}
						value={keyword}
					/>
				</p>
				<Rooms
					data = {filteredList}
					onRemove = {this.handleRemove}
					onUpdate = {this.handleUpdate}
				/>
			</div>
		);
	}
}

export default App2;
