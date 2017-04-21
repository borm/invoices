let _ = require('lodash');

module.exports = function (app, model) {

	let Invoice = model.Invoice;

	app.route('/api/invoices')
		.get(function(req, res) {
			Invoice.findAll().then(function(invoices) {
				res.json(invoices);
			})
		})
		.post(function(req, res) {
      let invoice = Invoice.build(_.pick(req.body, ['customer_id', 'discount', 'total']));
			invoice.save().then(function(invoice){
				console.log(invoice);
				res.json(invoice);
			});
		});

	app.route('/api/invoices/:invoice_id')
		.get(function(req, res) {
			Invoice.findById(req.params.invoice_id).then(function(invoice) {
				res.json(invoice);
			});
		})
		.put(function(req, res) {
			Invoice.findById(req.params.invoice_id).then(function(invoice) {
				invoice.update(_.pick(req.body, ['customer_id', 'discount', 'total'])).then(function(invoice) {
					res.json(invoice);
				});
			});
		})
		.delete(function(req, res) {
			Invoice.findById(req.params.invoice_id).then(function(invoice) {
				invoice.destroy().then(function(invoice) {
					res.json(invoice);
				});
			});
		});
};