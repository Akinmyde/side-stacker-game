import uuidValidator from 'uuid-validate'

import { getNextPlayer } from './helper'
import Queries from './queries'

const Controller = {
    getBoardInfo: async (req, res) => {
        const { gameId } = req.query
        const isValidId = uuidValidator(gameId)

        if (!isValidId) {
            return res.status(400).json({
                message: 'Invalid gameId'
            })
        }

        const player = await Queries.get(gameId)

        if (player) {
            return res.status(200).json({
                gameId: player.id,
                boardInfo: player.boardInfo,
                winner: player.winner,
                nextPlayer: player.nextPlayer,
                inPlay: player.inPlay,
                player1: player.player1,
                player2: player.player2,
            })
        }
    },

    createBoard: async (req, res) => {
        const boardInfo = [...Array(7)].map(x => Array(7).fill('_'))
        const { avatar: player1 } = req.body
        const player2 = getNextPlayer(player1)

        const game = await Queries.create({ boardInfo, player1, player2, nextPlayer: player1 })

        if (game) {
            return res.status(201).json({
                data: game
            })
        }
    }

}

export default Controller
