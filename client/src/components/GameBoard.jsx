import { useState, useEffect } from "react"
import WelcomeScreen from "./Welcome"
import socket from "../socket"
import Box from "./Box"
import { getGameInfo } from "../api"
import { playAvatarOnTheBoard, setPlayerInformations } from "../helper"

const GameBoard = () => {
    const currentPlayer = JSON.parse(localStorage.getItem("playerInfo"))
    const gameId = localStorage.getItem("gameId")

    const [board, setBoard] = useState([[]])
    const [player, setPlayer] = useState({})
    const [size] = useState(7)
    const [winCount] = useState(4)
    const [winner, setWinner] = useState('')
    const [nextPlayer, setNextPlayer] = useState('X')
    const [inPlay, setInPlay] = useState(false)

    const playAgain = () => {
        localStorage.clear();
        setPlayer({})
    }

    useEffect(() => {
        const grid = [...Array(size)].map(x => Array(size).fill('_'))
        setBoard(grid)
    }, [size])

    useEffect(() => {
        const getBoard = async () => {
            if (gameId) {
                const gameInfo = await getGameInfo(gameId)
                if (gameInfo.boardInfo) {
                    setBoard(gameInfo.boardInfo)
                    setWinner(gameInfo.winner)
                    setNextPlayer(gameInfo.nextPlayer)
                    setInPlay(gameInfo.inPlay)
                    setPlayerInformations(currentPlayer, { gameId, inPlay })
                }
            }
        }

        getBoard()
        // eslint-disable-next-line
    }, [gameId])

    const onClick = (row, col) => {
        if (board[row][col] === '_' && nextPlayer === currentPlayer.avatar && !winner && inPlay) {
            const { newBoard, isWin, nextToPlay } = playAvatarOnTheBoard(row, col, board, winCount)
            if (isWin) {
                setWinner(currentPlayer.avatar)
            }
            setBoard(newBoard)
            setNextPlayer(nextToPlay)
        }
    }

    useEffect(() => {
        socket.on('user_played', data => {
            const { boardInfo, avatar, isWin } = data
            if (isWin) setWinner(avatar)

            const newBoard = [...boardInfo]
            setBoard(newBoard)
        })

        socket.on('next_to_play', nextToPlay => {
            setNextPlayer(nextToPlay)
        })

        socket.on('start_game', inPlay => {
            setInPlay(inPlay)
        })
    }, [])

    if (player?.id || currentPlayer?.id) {
        return (
            <div>
                <h5>Your Avatar is: {player.avatar || currentPlayer.avatar}</h5>
                <div className="wrapper">
                    {board.map((item, row) => {
                        return item.map((data, col) => {
                            return (
                                <Box
                                    key={col}
                                    col={col}
                                    row={row}
                                    className={(nextPlayer !== currentPlayer.avatar || winner || !inPlay) ? 'box box-not-allowed' : 'box'}
                                    data={data}
                                    onClick={() => onClick(row, col)}
                                />
                            )
                        })
                    })}
                </div>
                {(!inPlay && currentPlayer.id === 'player 1') && <h6>Your gameId is: <br /> {gameId} <br />Send to you friend to play</h6>}
                {winner && (
                    <div>
                        <h4>{`Game Over: Player ${winner} won`}</h4>
                        <button onClick={playAgain}>Play Again</button>
                    </div>
                )}
                {(nextPlayer !== currentPlayer.avatar && !winner) && <h6>{`${nextPlayer} is playing...`}</h6>}
            </div>

        )
    } else {
        return <WelcomeScreen setPlayer={setPlayer} />
    }
}

export default GameBoard
