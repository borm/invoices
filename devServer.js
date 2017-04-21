'use strict';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config.babel'

module.exports = function (app) {
	const compiler = webpack(webpackConfig);
	let bundleStart = null;
	// We give notice in the terminal when it starts bundling and
	// set the time it started
	compiler.plugin('compile', function () {
		console.log('Bundling...');
		bundleStart = Date.now();
	});

	// We also give notice when it is done compiling, including the
	// time it took. Nice to have
	compiler.plugin('done', function () {
		console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
	});
	const middleware = webpackDevMiddleware(compiler, {
		quiet: false,
		noInfo: false,
		hot: true,
		inline: true,
		lazy: false,
		headers: {'Access-Control-Allow-Origin': '*'},
		publicPath: webpackConfig.output.publicPath,
		contentBase: 'public/src',
		stats: {
			colors: true,
			hash: false,
			timings: true,
			chunks: false,
			chunkModules: false,
			modules: false
		}
	});

	app.use(middleware);
	app.use(webpackHotMiddleware(compiler));

	app.get('*', function response(req, res) {
		res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'public', 'index.html')));
		res.end()
	});
};