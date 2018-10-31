'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Targets', [
			{ companyId: 1, categoryId: 13, createdAt: new Date(), updatedAt: new Date() },
			{ companyId: 2, categoryId: 8, createdAt: new Date(), updatedAt: new Date() },
			{ companyId: 3, categoryId: 13, createdAt: new Date(), updatedAt: new Date() },
			{ companyId: 4, categoryId: 13, createdAt: new Date(), updatedAt: new Date() },
			{ companyId: 5, categoryId: 13, createdAt: new Date(), updatedAt: new Date() },
			{ companyId: 6, categoryId: 8, createdAt: new Date(), updatedAt: new Date() },
			{ companyId: 7, categoryId: 8, createdAt: new Date(), updatedAt: new Date() },
			{ companyId: 8, categoryId: 8, createdAt: new Date(), updatedAt: new Date() },
			{ companyId: 9, categoryId: 8, createdAt: new Date(), updatedAt: new Date() },
			{ companyId: 10, categoryId: 8, createdAt: new Date(), updatedAt: new Date() }
		],{});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Targets', null, {});
	}
};
