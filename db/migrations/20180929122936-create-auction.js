'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Auctions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      companyId: {
		type: Sequelize.INTEGER,
		references: {model: 'Companies', key: 'id'}
      },
      categoryId: {
		type: Sequelize.INTEGER,
		references: {model: 'Categories', key: 'id'}
      },
      itemNumber: {
        type: Sequelize.TEXT
      },
      messageNumber: {
        type: Sequelize.TEXT
      },
      about: {
        type: Sequelize.TEXT
      },
      startPrice: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Auctions');
  }
};