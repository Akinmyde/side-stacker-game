import express from 'express'
import http from 'http'
import cors from 'cors'

import socket from './socket'
import Controler from './controller'

const app = express()
const server = http.createServer(app)

app.use(express.json())
app.use(cors())

app.get('/board', Controler.getBoardInfo)
app.post('/board', Controler.createBoard)

socket(server)

server.listen(4000, () => {
    console.log('app listening on port 4000')
})
