import React, { useRef, useEffect } from 'react'

const WebSocketContext = React.createContext(null)
export { WebSocketContext }

export default (props) => {
	const ws = useRef(null)

	let connInterval = null
	//websocket start
	const webSocketInit = () => {
		const webSocketUrl = `wss://api.zodaland.com`

			console.log('conning...')
			ws.current = new WebSocket(webSocketUrl)
			ws.current.onopen = () => {
				/////join test
				const data = { type: 'CHAT', command: 'join' }
				ws.current.send(JSON.stringify(data))
				/////
				console.log('conn')
				clearInterval(connInterval)
				connInterval = null
			}
			ws.current.onmessage = (evt) => {
				const data = JSON.parse(evt.data)
				props.onMessage(data)
				////join test
				console.log('-------res message-----')
				console.log(data)
				console.log('-----------------------')
				////
			}
			ws.current.onclose = error => {
				console.log('disconn')
				if (!connInterval) {
					connInterval = setInterval(() => {
						console.log('reconning...')
						checkConnection(ws)
					}, 10000)
				}
			}
			ws.current.onerror = error => {
				console.log('error disconn')
				if (!connInterval) {
					connInterval = setInterval(() => {
						console.log('reconning...')
						checkConnection()
					}, 10000)
				}
			}
	}

	//websocket restart
	const checkConnection = () => {
		if (!ws.current || ws.current.readyState === WebSocket.CLOSED) {
			webSocketInit()
		}
	}

	//Component Did Mount
	useEffect(() => {
		checkConnection()
	})

	return (
		<WebSocketContext.Provider value={ws}>
			{props.children}
		</WebSocketContext.Provider>
	)
}