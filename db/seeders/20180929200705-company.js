'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Companies', [
			{ id: 1, name: 'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "РУССКАЯ КОМПАНИЯ"', inn: '2312180144', createdAt: new Date(), updatedAt: new Date() },
			{ id: 2, name: 'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "ФИНАНСОВАЯ КОМПАНИЯ КАПИТАЛ ИНВЕСТ"', inn: '2225153948', createdAt: new Date(), updatedAt: new Date() },
			{ id: 3, name: 'ООО "Артемида-Юг"', inn: '2312195782', createdAt: new Date(), updatedAt: new Date() },
			{ id: 4, name: 'ООО "Армавирский ОРС"', inn: '2302046291', createdAt: new Date(), updatedAt: new Date() },
			{ id: 5, name: 'ООО "ЭВЕРЕСТ"', inn: '2374002568', createdAt: new Date(), updatedAt: new Date() },
			{ id: 6, name: 'МТУ', inn: '2308171570', createdAt: new Date(), updatedAt: new Date() },
			{ id: 7, name: 'ГОСУДАРСТВЕННОЕ УНИТАРНОЕ ПРЕДПРИЯТИЕ ГОРОДА СЕВАСТОПОЛЯ "СЕВАСТОПОЛЬСКИЙ МОРСКОЙ ПОРТ"', inn: '9204002475', createdAt: new Date(), updatedAt: new Date() },
			{ id: 8, name: 'ГОСУДАРСТВЕННОЕ УНИТАРНОЕ ПРЕДПРИЯТИЕ "ЦЕНТР ЭФФЕКТИВНОГО ИСПОЛЬЗОВАНИЯ СОБСТВЕННОСТИ ГОРОДА"', inn: '9204551676', createdAt: new Date(), updatedAt: new Date() },
			{ id: 9, name: 'МИНИСТЕРСТВО ИМУЩЕСТВЕННЫХ И ЗЕМЕЛЬНЫХ ОТНОШЕНИЙ РЕСПУБЛИКИ КРЫМ', inn: '9102012080', createdAt: new Date(), updatedAt: new Date() },
			{ id: 10, name: 'ГОСУДАРСТВЕННОЕ УНИТАРНОЕ ПРЕДПРИЯТИЕ РЕСПУБЛИКИ КРЫМ "КРЫМСКИЕ МОРСКИЕ ПОРТЫ"', inn: '9111000450', createdAt: new Date(), updatedAt: new Date() }
		],{});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Companies', null, {});
	}
};
