import React, { useState, useContext } from 'react'
import { WebSocketContext } from '../library/WebSocketProvider'

function TextInputBox(props) {
	const [message, setMessage] = useState('')
	const ws = useContext(WebSocketContext)

	const handleChangeText = (e) => {
		setMessage(e.target.value)
	}

	const handleClickSubmit = () => {
		if (message.trim() === '') {
			return
		}
		if (ws.current && ws.current.readyState === WebSocket.OPEN) {
			ws.current.send(JSON.stringify({
				type: 'CHAT',
				command: 'send',
				name: props.name,
				content: message
			}))

			setMessage('')
/*
			props.onMessage({
				type: 'CHAT',
				command: 'myself',
				name: props.name,
				content: message
			})
*/
		} else {
			alert('서버와 연결이 끊겼습니다.')
		}
	}
	
	const handleKeyUp = (e) => {
		if (e.keyCode === 13) {
			handleClickSubmit()
		}
	}

	return (
		<div>
			<input
				type="text"
				value={message}
				onChange={handleChangeText}
				onKeyUp={handleKeyUp}
			/>
			<button type="button" onClick={handleClickSubmit}>Send</button>
		</div>
	)
}

export default TextInputBox