const baseUrl = process.env.REACT_APP_API_BASE_URL

export const getGameInfo = async gameId => {
    const data = await fetch(`${baseUrl}/board?gameId=${gameId}`)
    return data.json()
}

export const createGameInfo = async avatar => {
    const data = { avatar }
    const response = await fetch(`${baseUrl}/board`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    return response.json()
}