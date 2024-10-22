import { io } from 'socket.io-client'

// const socket = io('https://forest-loop-back-test-socket.onrender.com')
// const socket = io('https://forest-loop-back-test-socket-room.onrender.com')
console.log(socket.connected)
console.log(socket)

// const socket = io('http://localhost:3000')

export default socket
