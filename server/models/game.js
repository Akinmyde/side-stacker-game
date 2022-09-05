const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Game.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    boardInfo: {
      type: DataTypes.STRING,
      get: function () {
        return JSON.parse(this.getDataValue('boardInfo'))
      },
      set: function (val) {
        return this.setDataValue('boardInfo', JSON.stringify(val))
      }
    },
    player1: {
      type: DataTypes.STRING,
    },
    player2: {
      type: DataTypes.STRING,
    },
    winner: {
      type: DataTypes.STRING,
    },
    nextPlayer: {
      type: DataTypes.STRING,
    },
    inPlay: {
      type: DataTypes.BOOLEAN,
    }
  }, {
    sequelize,
    modelName: 'Game',
  })
  return Game
}
