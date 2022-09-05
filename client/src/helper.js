import socket from "./socket"

export const setPlayerInformations = (playerInfo, gameInfo) => {
    localStorage.setItem('playerInfo', JSON.stringify(playerInfo))
    localStorage.setItem('gameId', gameInfo.gameId)

    socket.emit('join_game', { gameInfo, playerInfo })
}

export const checkWinner = (board, avatar, winCount) => {
    for (let row = 0; row < board.length; row++) {
        let rowCount = 0
        let colCount = 0

        for (let col = 0; col < board.length; col++) {

            //Check user row
            if (board[row][col] === avatar) {
                rowCount++
            } else {
                rowCount = 0;
            }

            //Check user col
            if (board[col][row] === avatar) {
                colCount++
            } else {
                colCount = 0;
            }
            
            if (rowCount === winCount || colCount === winCount) {
                return true
            }
        }

    }
}

export const playAvatarOnTheBoard = (row, col, board, winCount) => {
    const currentPlayer = JSON.parse(localStorage.getItem("playerInfo"))
    const gameId = localStorage.getItem("gameId")
    const newBoard = [...board]
    newBoard[row][col] = currentPlayer.avatar

    const isWin = checkWinner(newBoard, currentPlayer.avatar, winCount)

    socket.emit("user_turn", {
        boardInfo: newBoard,
        avatar: currentPlayer.avatar,
        isWin,
        gameId,
    })

    let nextToPlay = ''
    if (currentPlayer.avatar === 'X') {
        nextToPlay = 'O'
    } else {
        nextToPlay = 'X'
    }

    return { newBoard, isWin, nextToPlay }
}
