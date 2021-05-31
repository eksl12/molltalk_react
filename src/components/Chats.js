import React, { useState, useEffect, memo } from 'react'
import { chatState } from '../modules/chat'
import { useRecoilState } from 'recoil'

const Chats = props => {
	const [items, setItems] = useRecoilState(chatState)
	//dom 접근 ref 사용
	let box = null
	const addItem = (item) => {
		console.log('----------addItem----------')
		console.log(items.length)
		console.log(item)
		console.log('---------------------------')
		switch (item.command) {
			case 'join': {
				setItems(items.concat(item.content))
				break
			}
			case 'myself': {
				const myItem = {
					name: item.name,
					content: item.content,
					complete: false
				}

				setItems([
					...items,
					myItem
				])
				break
			}
			default: {
				if (item.name === props.name && items.length === item.length) {
					setItems(items.map(myItem => items[items.length - 1] === item
							 ? { ...myItem, complete: true}
							 : myItem
					))
				} else {
					const myItem = {
						name: item.name,
						content: item.content
					}

					setItems([
						...items,
						myItem
					])
				}
				break
			}
		}
	}

	let style = {
		width: '350px',
		height: '200px',
		fontSize: '12px',
		overflowY: 'scroll'
	}
	/*
	ws.onmessage = (evt) => {
		const data = JSON.parse(evt.data)
		const item = {
			chat: data.chat,
			name: data.name,
			isMine: (data.name === props.name) ? true : false
		}
		addItem(item)
	}
*/
	//props.item이 바뀔때마다 호출
	useEffect(() => {
		if (!props.item) {
			return
		}
		const item = props.item

		if (item.type === 'CHAT') {
			switch(item.command) {
				case 'join':
					addItem(props.item)
					console.log(props.item)
					break
				case 'send':
					addItem(props.item)
					break
				case 'myself':
					addItem(props.item)
				default:
					break
			}
		}

	}, [props.item])
	//컴포넌트 렌더 후 호출
	useEffect(() => {
		if (box) {
			box.scrollTop = box.scrollHeight
		}
	})

	return (
		<div 
			style={style}
			ref = {ref => {
				box = ref
			}}
		>
			<ul>
				{
					items.map((item) => {
						let chatStyle = { listStyle: 'none' }
						let message = ''

						if (item.name === props.name) {
							chatStyle.textAlign = 'right'
							message = item.content + ' : ' + item.name
						} else {
							chatStyle.textAlign = 'reft'
							message = item.name + ' : ' + item.content
						}

						if (item.complete !== undefined && item.complete === false) {
							chatStyle.color = '#888888'
						} else if (item.complete !== undefined && item.complete === true) {
							console.log(item)
						}
						return (
							<li style={chatStyle}>{message}</li>
						)
					})
				}
			</ul>
		</div>
	)
}

export default Chats