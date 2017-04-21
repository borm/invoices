var _ = require('lodash');

module.exports = function (app, model) {

	var InvoiceItem = model.InvoiceItem;

	app.route('/api/invoices/:invoice_id/items')
		.get(function(req, res) {
			InvoiceItem.findAll({where: { invoice_id: req.params.invoice_id }}).then(function(invoice_items) {
				res.json(invoice_items);
			})
		})
		.post(function(req, res) {
			var invoice_item = InvoiceItem.build(_.pick(req.body, ['product_id', 'quantity']));
			invoice_item.set('invoice_id', req.params.invoice_id);
			invoice_item.save().then(function(invoice_item){
				return res.json(invoice_item);
			});
		});

	app.route('/api/invoices/:invoice_id/items/:id')
		.get(function(req, res) {
			InvoiceItem.findById(req.params.id).then(function(invoice_item) {
				res.json(invoice_item);
			});
		})
		.put(function(req, res) {

			InvoiceItem.findById(req.params.id).then(function(invoice_item) {
				invoice_item.update(_.pick(req.body, ['product_id', 'quantity'])).then(function(invoice_item) {
					res.json(invoice_item);
				});
			});
		})
		.delete(function(req, res) {
			console.log(req.params);
			InvoiceItem.findById(req.params.id).then(function(invoice_item) {
				invoice_item.destroy().then(function(invoice_item) {
					res.json(invoice_item);
				});
			});
		});
};