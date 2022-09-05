import { useState } from 'react'
import { getGameInfo } from '../api'
import { setPlayerInformations } from '../helper'

const JoinGame = ({ setPlayer }) => {
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState(false)

    const joinGame = async () => {
        const gameInfo = await getGameInfo(inputValue)
        if (gameInfo.gameId && !gameInfo.inPlay) {
            const playerInfo = { avatar: gameInfo.player2, id: 'player 2' }
            setPlayerInformations(playerInfo, { gameId: gameInfo.gameId, inPlay: true })
            setPlayer(playerInfo)
        } else if (gameInfo.inPlay) {
            setError('Game already started. Join Another game')
        } else {
            setError('Invalid GameId, Try another GameId')
        }
    }

    return (
        <>
            <div>
                <h6 className="no-margin">Enter Game Id</h6>
                <input onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
                {error && <p className="no-margin error">{error}</p>}
            </div>
            <button onClick={joinGame}>Join game</button>
        </>
    )
}

export default JoinGame
