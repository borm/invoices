var _ = require('lodash');

module.exports = function (app, model) {

	var Product = model.Product;

	app.route('/api/products')
		.get(function(req, res) {
			Product.findAll().then(function(products) {
				res.json(products);
			})
		})
		.post(function(req, res) {
			var product = Product.build(_.pick(req.body, ['name', 'price']));
			product.save().then(function(product){
				res.json(product);
			});
		});

	app.route('/api/products/:product_id')
		.get(function(req, res) {
			Product.findById(req.params.product_id).then(function(product) {
				res.json(product);
			});
		})
		.put(function(req, res) {
			Product.findById(req.params.product_id).then(function(product) {
				product.update(_.pick(req.body, ['name', 'price'])).then(function(product) {
					res.json(product);
				});
			});
		})
		.delete(function(req, res) {
			Product.findById(req.params.product_id).then(function(product) {
				product.destroy().then(function(product) {
					res.json(product);
				});
			});
		});
};