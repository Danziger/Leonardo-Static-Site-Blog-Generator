'use strict';

const webpack = require('webpack');
const path    = require('path');

const PATHS = require('./paths');


// WEBPACK PLUGINS:

const ExtractTextPlugin = require('extract-text-webpack-plugin');
// Extracts target requires' content to separated files.
// See: https://github.com/webpack/extract-text-webpack-plugin

const ExtractCSS       = new ExtractTextPlugin('styles.css');
const ExtractInlineCSS = new ExtractTextPlugin('[name].inline.css');

// const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
// Do type checking in a separate process, so webpack don't need to wait.
// See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse


// WEBPACK CONSTANTS:

const METADATA = {
	title: 'Default Title',
	baseUrl: '/',
};

// WEBPACK CONFIG:


// TODO: Just for dev:
// modify some webpack config options
// const myDevConfig = Object.create(CONFIG);
// myDevConfig.devtool = 'sourcemap';
// myDevConfig.debug = true;


const WEBPACK_CONFIG_DEV = {
	// target: 'node',
	target: 'web',
	// Default

	metadata: METADATA,
	// Static metadata for index.html

	// cache: false,
	// Enabled by default to improve performance.
	// See: http://webpack.github.io/docs/configuration.html#cache

	// devtool: 'source-map',
	// Source maps support ('inline-source-map' also works)

	watch: false,

	context: PATHS.ROOT,

	resolve: {
		extensions: ['', '.js', '.ts'],
		// An array of extensions that should be used to resolve modules.
		// See: http://webpack.github.io/docs/configuration.html#resolve-extensions

		modulesDirectories: ['node_modules'],
		// Remove other default values.
	},

	// entry: PATHS.WEBPACK_ENTRY,

	output: {
		path: PATHS.DIST,
		filename: '[name].js',
	},

	module: {

		// (PRE) LOADERS: //////////////////////////////////////////////////////////////////////////////////////////////

		preLoaders: [{
			// TSLint loader support for *.ts files.
			// See: https://github.com/wbuchwalter/tslint-loader

			test: /\.ts$/,
			exclude: /node_modules/,
			loader: 'tslint-loader',
		}],

		// LOADERS: ////////////////////////////////////////////////////////////////////////////////////////////////////

		loaders: [{
			// Inlines TS imports into TS files and compiles them.

			test: /\.ts$/,
			exclude: /node_modules/,
			loader: 'awesome-typescript-loader',
		}, {
			// Inlines require('file.html') into the JS files as a string.

			test: /\.html$/,
			exclude: /node_modules/,
			loader: 'raw-loader',
		}, {
			// Extracts require('file.scss') into separated files.
			// - sass-loader: Compiles SASS code.
			// - autoprefixer-loader: Autoprefixes generated CSS code. // TODO: Update: https://github.com/postcss/postcss-loader
			// - css-loader: Resolves CSS imports and much more...
			// - style-loader: Loader to be used when CSS is not extracted.

			test: /^((?!\.inline).)*\.scss$/,
			exclude: /node_modules/,
			loader: ExtractCSS.extract('style-loader', ['css-loader', 'autoprefixer-loader', 'sass-loader']),
		}, {
			// Same as previous, but for files that will be inlined in the HTML.

			test: /\.inline\.scss$/,
			exclude: /node_modules/,
			loader: ExtractInlineCSS.extract('style-loader', ['css-loader', 'autoprefixer-loader', 'sass-loader']),
		}],
	},

	plugins: [
		ExtractCSS,
		ExtractInlineCSS,

		// new ForkCheckerPlugin(),

		/*
		 * Plugin: OccurenceOrderPlugin
		 * Description: Varies the distribution of the ids to get the smallest id length
		 * for often used ids.
		 *
		 * See: https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
		 * See: https://github.com/webpack/docs/wiki/optimization#minimize
		 */
		new webpack.optimize.OccurenceOrderPlugin(true),

		/* TODO: Add this
		 * Plugin: CommonsChunkPlugin
		 * Description: Shares common code between the pages.
		 * It identifies common modules and put them into a commons chunk.
		 *
		 * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
		 * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
		 */
		/*new webpack.optimize.CommonsChunkPlugin({
		 name: ['polyfills', 'vendor'].reverse()
		 }),*/
	],
};

// Search for all pages in src/pages/* to use them as entry points.

// TODO: Add exclude array (?)

const entry = {};

require('fs').readdirSync(PATHS.PAGES).forEach(page => {
	entry[page] = path.join(PATHS.PAGES, page, page + '.ts');
});

WEBPACK_CONFIG_DEV.entry = entry;

// Export the config:

module.exports = WEBPACK_CONFIG_DEV;
