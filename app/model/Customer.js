var Sequelize = require('sequelize');

module.exports = function (sequelize) {
	return sequelize.define('customers', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING
		},
		address: {
			type: Sequelize.STRING
		},
		phone: {
			type: Sequelize.STRING
		}
	});
};