var Sequelize = require('sequelize');

module.exports = function (sequelize) {
	return sequelize.define('invoices', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		customer_id: {
			type: Sequelize.INTEGER
		},
		discount: {
			type: Sequelize.DECIMAL
		},
		total: {
			type: Sequelize.DECIMAL
		}
	});
};