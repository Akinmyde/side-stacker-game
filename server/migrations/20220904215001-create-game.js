module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      },
      boardInfo: {
        type: Sequelize.STRING(10000000),
      },
      player1: {
        type: Sequelize.STRING,
      },
      player2: {
        type: Sequelize.STRING,
      },
      winner: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      nextPlayer: {
        type: Sequelize.STRING,
      },
      inPlay: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Games')
  }
}