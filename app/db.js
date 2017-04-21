var path = require('path');
module.exports = (function () {

	var Sequelize = require('sequelize');
	var instance;
	if ( !instance ) {
		instance = new Sequelize('sqlite://' + path.join(__dirname, 'invoices.sqlite'), {
			dialect: 'sqlite',
			storage: path.join(__dirname, 'invoices.sqlite')
		})
	}

	return instance;
})();