import db from './models'
const { Game } = db

const Queries = {
    get: async id => {
        const game = await Game.findByPk(id)
        if (game) return game
        return null
    },

    create: async obj => {
        const game = await Game.create(obj)
        return game
    }
}

export default Queries
