module.exports = function (app, model) {

	// CUSTOMERS API
	require('./routes/customers')(app, model);

	// PRODUCTS API
	require('./routes/products')(app, model);

	// INVOICES API
	require('./routes/invoices')(app, model);

	// INVOICE ITEMS API
	require('./routes/invoice_items')(app, model);

};