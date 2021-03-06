'use strict';

const gulp    = require('gulp');
const gutil   = require('gutil');
const webpack = require('webpack');

// const WebpackDevServer = require('webpack-dev-server');

const PATHS  = require('../../../../config/paths');
const config = require(PATHS.WEBPACK_CONFIG_DEV);

// Create a single instance of webpack compiler to allow caching:
const devWebpackCompiler = webpack(require(PATHS.WEBPACK_CONFIG_DEV));

// TODO: Gulp should modify the config to add the entry points, one per page!

// TODO: Separate configs in different files...

// TODO: Call webpack-dev-server from main gulp file...

// TODO: Create base webpack task as that one will be called from outside by the loader...

/***********************************************************************************************************************
 PRODUCTION BUILD:
 **/

gulp.task('webpack:build:prod', 'Production build.', done => {

	/*

	 // TODO: Move this to the config file itself...

	 var myConfig = Object.create(CONFIG);

	 myConfig.plugins = myConfig.plugins.concat(
	 new webpack.DefinePlugin({
	 'process.env': {
	 // This has effect on the react lib size
	 'NODE_ENV': JSON.stringify('production')
	 }
	 }),
	 new webpack.optimize.DedupePlugin(),
	 new webpack.optimize.UglifyJsPlugin()
	 );

	 */

	webpack(require(PATHS.WEBPACK_CONFIG_PROD), (err, stats) => {
		if (err) throw new gutil.PluginError('webpack:build', err);

		// TODO: Make this optional (verbose)
		// gutil.log(stats.toString({ colors: true }));

		console.log('Webpack (prod.) compilation finished.');

		done();
	});
});


/***********************************************************************************************************************
 DEVELOPMENT BUILD:
 **/

gulp.task('webpack:build:dev', 'Development build.', done => {
	devWebpackCompiler.run((err, stats) => {
		if (err) throw new gutil.PluginError('webpack:build-dev', err);

		// TODO: Make this optional (verbose)
		gutil.log(stats.toString({ colors: true }));

		console.log('Webpack (dev.) compilation finished.');

		done();
	});
});

gulp.task('webpack:build:test', 'Test build.', ['webpack:build:dev']);


gulp.task('webpack:build', 'Build.', ['webpack:build:dev']); // TODO: Check env.


// TODO: Refactor this...
// TODO: Live reload...

/*

 gulp.task('webpack:server', 'Launches a Webpack Dev. Server.', () => {
 // modify some webpack config options
 var myConfig = Object.create(CONFIG);
 myConfig.devtool = 'eval';
 myConfig.debug = true;

 // JS files
 gulp.start('hello-world');

 // Start a webpack-dev-server
 new WebpackDevServer(webpack(myConfig), {
 publicPath: '/',
 contentBase: PATHS.DIST,
 stats: {
 colors: true,
 },
 inline: true,
 hot: true,
 }).listen(8080, 'localhost', err => {
 if(err) throw new gutil.PluginError('webpack-dev-server', err);

 gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
 });
 });

 */