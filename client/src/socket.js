import io from 'socket.io-client'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const socket = io.connect(baseUrl)

export default socket
