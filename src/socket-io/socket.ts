import { io } from 'socket.io-client'

// const socket = io('https://forest-loop-back-test-socket.onrender.com')
const socket = io(import.meta.env.VITE_SOCKET_URL)

console.log(import.meta.env.VITE_SOCKET_URL)

// const socket = io('http://localhost:3000')
console.log(socket.connected)
console.log(socket)

export default socket
