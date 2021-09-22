'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("products", {
      id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
      },
      name: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      purchase: {
          type: Sequelize.FLOAT,
          allowNull: false,
      },
      sale: {
          type: Sequelize.FLOAT,
          allowNull: false,
      },
      amount: {
          type: Sequelize.INTEGER,
          allowNull: false,
      },
      category: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      provide: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
      },
  });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("products");
  }
};
