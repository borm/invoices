var sequelize = require('app/db.js');

module.exports = function (model) {
	sequelize.sync({
		force: true
	}).then(function() {

		require('./Customer.js')(model.Customer);
		require('./Product.js')(model.Product);

	}).catch(function(e) {
		console.log("ERROR SYNCING WITH DB", e);
	});
};