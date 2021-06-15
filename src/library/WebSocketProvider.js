import React, { useState, useRef, useEffect, useCallback } from 'react'

const WebSocketContext = React.createContext(null)
export { WebSocketContext }

const Ws = (props) => {
	const ws = useRef(null)
	const pingTimeout = useRef(null)
	const connTimeout = useRef(null)

	const flag = props.flag

	const [onWs, setOnWs] = useState(false)

	const goWs = useCallback(() => {
		//websocket start
		const webSocketInit = () => {
			const webSocketUrl = `wss://api.test.zodaland.com/`

			ws.current = new WebSocket(webSocketUrl)
			ws.current.onopen = () => {
				heartbeat()
			}
			ws.current.onmessage = (evt) => {
				const data = JSON.parse(evt.data)
				props.onMessage(data)
			}
			ws.current.onclose = error => {
				setOnWs(false)
			}
			ws.current.onerror = error => {
			}
		}

		//ping
		const heartbeat = () => {
			if (ws.current && ws.current.readyState === WebSocket.OPEN) {
				ws.current.send(JSON.stringify({ type: 'PING' }))

				pingTimeout.current = setTimeout(() => {
					heartbeat()
				}, 900)
			} else {
				clearTimeout(pingTimeout.current)
				pingTimeout.current = null;
			}
		}

		//reconnect
		const connect = () => {
			if (ws.current && ws.current.readyState === WebSocket.OPEN) {
				return
			}
			webSocketInit()

			connTimeout.current = setTimeout(() => {
					console.log('reconn')
					connect()
			}, 500)
		}

		if (onWs) {
			connect()
		} else {
			setOnWs(true)
		}
	}, [onWs])

	useEffect(() => {
		goWs()

		return () => {
			clearTimeout(pingTimeout.current)
			pingTimeout.current = null
			clearTimeout(connTimeout.current)
			connTimeout.current = null
		}
	}, [goWs])
	const activateWebSocket = useCallback(() => {
		const join = () => {
			if (ws.current && ws.current.readyState === WebSocket.OPEN) {
				const data = { type: 'CHAT', command: 'join' }
				ws.current.send(JSON.stringify(data))
			} else {
				setTimeout(() => {
					join()
				}, 50)
			}
		}

		if (flag) {
			setOnWs(true)
			join()
		} else if (ws.current && ws.current.readyState === WebSocket.OPEN) {
			ws.current.close()
		}
	}, [flag])

	//Component Did Mount
	useEffect(activateWebSocket, [activateWebSocket])


	return (
		<WebSocketContext.Provider value={ws}>
			{props.children}
		</WebSocketContext.Provider>
	)
}

export default Ws