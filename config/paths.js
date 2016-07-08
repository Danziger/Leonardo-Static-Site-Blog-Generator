'use strict';

const path = require('path');

module.exports = {

	// ROOT:

	get ROOT() {
		return path.join(__dirname, '..');
	},

	// FIRST LEVEL:

	get BUILD() {
		return path.join(this.ROOT, 'build');
	},

	get CONFIG() {
		return path.join(this.ROOT, 'config');
	},

	get DIST() {
		return path.join(this.ROOT, 'dist');
	},

	get JEKYLL() {
		return path.join(this.ROOT, 'jekyll');
	},

	get SRC() {
		return path.join(this.ROOT, 'src');
	},

	// SOURCES BY TYPE:

	// SOURCES BY EXTENSION:

	get SCSS_FILES() {
		return [path.join(this.SRC, '**/*.scss')];
	},

	get TS_FILES() {
		return [path.join(this.SRC, '**/*.ts')];
	},

	get HTML_FILES() {
		return [path.join(this.SRC, '**/*.html')];
	},

	get EJS_FILES() {
		return [path.join(this.SRC, '**/*.ejs')];
	},

	// GULP:

	get GULP_TASKS() {
		return path.join(this.BUILD, 'gulp', 'tasks');
	},

	// WEBPACK:

	get WEBPACK_ENTRY() {
		return {
			index:      path.join(this.SRC, 'pages', 'index',      'index.ts'),
			about:      path.join(this.SRC, 'pages', 'about',      'about.ts'),
			contact:    path.join(this.SRC, 'pages', 'contact',    'contact.ts'),
		};
	},

	get WEBPACK_CONFIG() {
		return path.join(this.ROOT, 'webpack.config.js');
	},

	get WEBPACK_CONFIG_PROD() {
		return path.join(this.CONFIG, 'webpack.prod.js');
	},

	get WEBPACK_CONFIG_TEST() {
		return path.join(this.CONFIG, 'webpack.test.js');
	},

	get WEBPACK_CONFIG_DEV() {
		return path.join(this.CONFIG, 'webpack.dev.js');
	},
};
