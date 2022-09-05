import { Server } from 'socket.io'
import cors from './config/cors'
import EVENTS from './enums/events'
import { getNextPlayer } from './helper'

import Queries from './queries'

const socket = (server) => {
    const io = new Server(server, { cors })

    io.on('connection', (socket) => {
        socket.on(EVENTS.JOIN_GAME, async ({ gameInfo, playerInfo }) => {
            const { gameId, inPlay } = gameInfo
            const player = await Queries.get(gameId)

            if (playerInfo.id) {
                socket.join(gameId)

                if (inPlay) {
                    player.update({ inPlay })

                    socket.to(gameId).emit(EVENTS.START_GAME, inPlay)
                }
            }
        })

        socket.on(EVENTS.USER_TURN, async data => {
            const { boardInfo, avatar, isWin, gameId } = data

            const player = await Queries.get(gameId)

            if (player) {
                const winner = isWin ? avatar : ''
                let nextToPlay = getNextPlayer(avatar)
                player.update({ boardInfo, winner, nextPlayer: nextToPlay })

                socket.to(gameId).emit(EVENTS.USER_PLAYED, { boardInfo, avatar, isWin })


                socket.to(gameId).emit(EVENTS.NEXT_TO_PLAY, nextToPlay)
            }
        })
    })
}

export default socket
