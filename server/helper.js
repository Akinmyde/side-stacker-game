export const getNextPlayer = currentPlayer => {
    let nextPlayer = ''
    if (currentPlayer === 'X') {
        nextPlayer = 'O'
    } else if (currentPlayer === 'O') {
        nextPlayer = 'X'
    }

    return nextPlayer
}

