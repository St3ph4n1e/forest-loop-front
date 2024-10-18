import axios from 'axios'

// const api = axios.create({
//   baseURL: 'http://localhost:3000/api',
// })

const api = axios.create({
  baseURL: 'https://forest-loop-back-test-socket-room.onrender.com/',
})

export const fetchData = async () => {
  try {
    const response = await api.get('/test')
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
