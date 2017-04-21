/**
 * Created by borm on 12.04.17.
 */
import fs from 'fs'
import path from 'path'
import autoprefixer from 'autoprefixer'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import config from 'config'

const babelRc = JSON.parse(fs.readFileSync('./.babelrc'));

const isProd = config.env === 'production';

const { source, output } = config.public;

const webpackConfig = {
	devtool: isProd ? 'eval' : 'source-map',
	target: "web",
	context: source,
	resolve: {
		modules: [source, path.join(__dirname, 'node_modules/mui/lib'), 'node_modules'],
		extensions: ['.js', '.scss'],
	},
	//externals: ['react', 'react-dom'],
	entry: {
		app: ((app)=>{
			isProd || app.unshift('webpack-hot-middleware/client');
			return app;
		})(['./app.js']),
		vendor: [
			'babel-polyfill',
			'es6-promise',
			'isomorphic-fetch',
			'react-dom',
			'react',
		],
	},
	output: {
		path: output,
		filename: 'dist/[name]-[hash].js',
		publicPath: '/',
	},
	module: {
		rules: ((rules)=>{

			isProd && rules.push({
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader!postcss-loader!sass-loader',
				}),
			});

			isProd || rules.push({
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					'css-loader',
					'postcss-loader',
					'sass-loader?sourceMap'
					+ '&includePaths[]=' + path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets')
				],
			});

			return rules;
		})([
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				use: [{
					loader: 'babel-loader',
					options: {
						presets: (presets=>{
							presets.push('react');
							return presets;
						})(babelRc.presets),
						plugins: isProd ? babelRc.plugins : (plugins => {
							plugins.push(
								['react-transform', {
									transforms: [{
										transform: 'react-transform-hmr',
										imports: ['react'],
										locals: ['module']
									}]
								}]
							);
							return plugins
						})(babelRc.plugins)
					}
				}],
			},
		])
	},
	plugins: ((plugins)=>{
		isProd || plugins.push(
			new webpack.HotModuleReplacementPlugin()
		);
		isProd && plugins.push(
			new ExtractTextPlugin('dist/style-[hash].css')
		);
		return plugins;
	})([
		new HtmlWebpackPlugin({
			template: 'app.html',
			inject: 'body',
			filename: 'index.html'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity,
			filename: 'dist/vendor-[hash].js',
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [
					autoprefixer({
						browsers: [
							'last 3 version',
							'ie >= 10',
						],
					}),
				],
				context: source,
			},
		}),
		new webpack.ProvidePlugin({
			'React':   'react',
			'ReactDOM':'react-dom',
		}),
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en)$/),
	])
};

export default webpackConfig
export {config}
