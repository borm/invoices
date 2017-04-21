var sequelize = require('app/db.js');

var Customer = require('./Customer.js')(sequelize);
var Product = require('./Product.js')(sequelize);
var Invoice = require('./Invoice.js')(sequelize);
var InvoiceItem = require('./InvoiceItem.js')(sequelize);

module.exports = {
	Customer: Customer,
	Product: Product,
	Invoice: Invoice,
	InvoiceItem: InvoiceItem,
};