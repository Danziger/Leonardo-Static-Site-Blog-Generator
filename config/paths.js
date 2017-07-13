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

	get PAGES() {
		return path.join(this.SRC, 'pages');
	},

	get PAGES_HTML() {
		return path.join(this.SRC, 'pages', '**/*.html');
	},

	get PAGES_HTML_TEST() { // TODO: TEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEMP!
		return path.join(this.SRC, 'pages', '**/*.dust');
	},

	get COMPONENTS_HTML() {
		return path.join(this.SRC, 'components', '**/*.html');
	},

	// SOURCES BY EXTENSION:

	get SCSS_FILES() {
		return [path.join(this.SRC, '**/*.scss')];
	},

	get TS_FILES() {
		return [path.join(this.SRC, '**/*.ts')];
	},

	// DIST:

	get DIST_HTML() {
		return [path.join(this.DIST, '*.html')];
	},

	get DIST_STYLES() {
		return [path.join(this.DIST, 'styles.css'), path.join(this.DIST, 'styles.css.map')];
	},

	get DIST_INLINE_CSS() {
		// TODO: Not working, fix this.

		return [path.join(this.DIST, '*.inline.css'), path.join(this.DIST, '*.inline.css.map')];
	},

	get DIST_JS() {
		return [path.join(this.DIST, '*.js'), path.join(this.DIST, '*.js.map')];
	},

	// GULP:

	get GULP_TASKS() {
		return path.join(this.BUILD, 'gulp', 'tasks');
	},

	// WEBPACK:

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
