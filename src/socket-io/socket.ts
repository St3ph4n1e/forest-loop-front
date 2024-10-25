import { io } from 'socket.io-client'

// const socket = io('https://forest-loop-back-test-socket.onrender.com')
//const socket = io('https://forest-loop-back-test-socket-room.onrender.com')

const socket = io('http://localhost:3000')
console.log(socket.connected)
console.log(socket)

export default socket
