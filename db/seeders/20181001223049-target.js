'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Targets', [
			{ companyId: 1, categoryId: 13 },
			{ companyId: 2, categoryId: 8 },
			{ companyId: 3, categoryId: 13 },
			{ companyId: 4, categoryId: 13 },
			{ companyId: 5, categoryId: 13 },
			{ companyId: 6, categoryId: 8 },
			{ companyId: 7, categoryId: 8 },
			{ companyId: 8, categoryId: 8 },
			{ companyId: 9, categoryId: 8 },
			{ companyId: 10, categoryId: 8 }
		],{});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Targets', null, {});
	}
};
