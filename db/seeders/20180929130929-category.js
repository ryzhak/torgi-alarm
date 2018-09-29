'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Categories', [
			{ id: 1, name: 'Аренда, безвозмездное пользование, доверительное управление имуществом, иные договоры, предусматривающие передачу прав владения и пользования в отношении государственного и муниципального имущества' },
			{ id: 2, name: 'Аренда и продажа земельных участков' },
			{ id: 3, name: 'Строительство' },
			{ id: 4, name: 'Охотхозяйственные соглашения' },
			{ id: 5, name: 'Пользование участками недр' },
			{ id: 6, name: 'Государственно-частное партнерство (соглашения о ГЧП/МЧП, концессионные соглашения)' },
			{ id: 7, name: 'Аренда лесных участков и продажа лесных насаждений' },
			{ id: 8, name: 'Продажа государственного и муниципального имущества' },
			{ id: 9, name: 'Передача прав на единые технологии' },
			{ id: 10, name: 'Водопользование' },
			{ id: 11, name: 'Рыболовство и добыча водных биоресурсов' },
			{ id: 12, name: 'ЖКХ' },
			{ id: 13, name: 'Реализация имущества должников' },
			{ id: 14, name: 'Создание искусственных земельных участков' },
			{ id: 15, name: 'Размещение рекламных конструкций' },
			{ id: 16, name: 'Продажа объектов электроэнергетики' },
			{ id: 17, name: 'Лицензии на оказание услуг связи' }
		],{});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Categories', null, {});
	}
};
