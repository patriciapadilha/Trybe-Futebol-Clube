module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('users', {
        id: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement: true,
        },
        username: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
        },
        role: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        }
      });
    },
    down: async (queryInterface) => {
      await queryInterface.dropTable('users');
    },
  };