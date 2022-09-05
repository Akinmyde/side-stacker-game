import { createGameInfo } from "../api"
import { setPlayerInformations } from "../helper"

const CreateGame = ({ setPlayer }) => {

    const createNewGame = async avatar => {
        const { data: gameInfo } = await createGameInfo(avatar)
        if (gameInfo) {
            const playerInfo = { avatar, id: 'player 1' }
            setPlayerInformations(playerInfo, { gameId: gameInfo.id, inPlay: false })
            setPlayer(playerInfo)
        }
    }

    return (
        <div>
            <div>
                <h4>Select your Avatar</h4>
            </div>
            <button onClick={() => createNewGame('X')}>X</button>
            <button onClick={() => createNewGame('O')}>O</button>
        </div>
    )
}

export default CreateGame
