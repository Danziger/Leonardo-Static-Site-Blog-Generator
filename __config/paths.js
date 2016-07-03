'use strict';

const path = require('path');

module.exports = {

	// ROOT:

	get ROOT() {
		return path.join(__dirname, '..');
	},

	// SRC and Webpack entry points:

	get SRC() {
		return path.join(this.ROOT, '__src');
	},

	get WEBPACK_ENTRY() {
		return {
			index:      path.join(this.SRC, 'pages', 'index',      'index'),
			about:      path.join(this.SRC, 'pages', 'about',      'about'),
			contact:    path.join(this.SRC, 'pages', 'contact',    'contact'),
		};
	},

	// BUILD & DIST:

	get BUILD() {
		return path.join(this.ROOT, '__build');
	},

	get DIST() {
		return path.join(this.ROOT, '__dist');
	},

	// BY EXTENSION:

	get SCSS() {
		return [path.join(this.SRC, '**/*.scss')];
	},

	get TS() {
		return [path.join(this.SRC, '**/*.ts')];
	},
};
