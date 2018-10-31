'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Categories', [
			{ id: 1, name: 'Аренда, безвозмездное пользование, доверительное управление имуществом, иные договоры, предусматривающие передачу прав владения и пользования в отношении государственного и муниципального имущества', createdAt: new Date(), updatedAt: new Date() },
			{ id: 2, name: 'Аренда и продажа земельных участков', createdAt: new Date(), updatedAt: new Date() },
			{ id: 3, name: 'Строительство', createdAt: new Date(), updatedAt: new Date() },
			{ id: 4, name: 'Охотхозяйственные соглашения', createdAt: new Date(), updatedAt: new Date() },
			{ id: 5, name: 'Пользование участками недр', createdAt: new Date(), updatedAt: new Date() },
			{ id: 6, name: 'Государственно-частное партнерство (соглашения о ГЧП/МЧП, концессионные соглашения)', createdAt: new Date(), updatedAt: new Date() },
			{ id: 7, name: 'Аренда лесных участков и продажа лесных насаждений', createdAt: new Date(), updatedAt: new Date() },
			{ id: 8, name: 'Продажа государственного и муниципального имущества', createdAt: new Date(), updatedAt: new Date() },
			{ id: 9, name: 'Передача прав на единые технологии', createdAt: new Date(), updatedAt: new Date() },
			{ id: 10, name: 'Водопользование', createdAt: new Date(), updatedAt: new Date() },
			{ id: 11, name: 'Рыболовство и добыча водных биоресурсов', createdAt: new Date(), updatedAt: new Date() },
			{ id: 12, name: 'ЖКХ', createdAt: new Date(), updatedAt: new Date() },
			{ id: 13, name: 'Реализация имущества должников', createdAt: new Date(), updatedAt: new Date() },
			{ id: 14, name: 'Создание искусственных земельных участков', createdAt: new Date(), updatedAt: new Date() },
			{ id: 15, name: 'Размещение рекламных конструкций', createdAt: new Date(), updatedAt: new Date() },
			{ id: 16, name: 'Продажа объектов электроэнергетики', createdAt: new Date(), updatedAt: new Date() },
			{ id: 17, name: 'Лицензии на оказание услуг связи', createdAt: new Date(), updatedAt: new Date() }
		],{});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Categories', null, {});
	}
};
