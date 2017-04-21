var Sequelize = require('sequelize');

module.exports = function (sequelize) {
	return sequelize.define('products', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING
		},
		price: {
			type: Sequelize.DECIMAL
		}
	});
};