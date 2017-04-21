var Sequelize = require('sequelize');

module.exports = function (sequelize) {
	return sequelize.define('invoice_items', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		invoice_id: {
			type: Sequelize.INTEGER
		},
		product_id: {
			type: Sequelize.INTEGER
		},
		quantity: {
			type: Sequelize.DECIMAL
		}
	})
}