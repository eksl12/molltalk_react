import React, { Component } from 'react';
import Room from './Room';

class Rooms extends Component {
	static defaultProps = {
		data: [],
		onRemove: () => console.warn('onRemove not defined'),
		onUpdate: () => console.warn('onUpdate not defined')
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.data !== this.props.data
	}

	render() {
		const { data, onRemove, onUpdate } = this.props;
		//index : info.no, 콘솔창 경고 감추기
		const list = data.map(
			(info, index) => (
				<Room
					key={index}
					room={info}
					onRemove={onRemove}
					onUpdate={onUpdate}
				/>
			)
		)

		return (
			<div>
				{list}
			</div>
		)
	}
}

export default Rooms