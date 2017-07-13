'use strict';

const debug       = require('gulp-debug');
const gulp        = require('gulp');
const runSequence = require('run-sequence');

const PATHS       = require('../../../../config/paths');


gulp.task('build:dev', 'Development build and move.', done => {
	runSequence('webpack:build:dev', 'move', done);
});

gulp.task('build:prod', 'Production build and move.', done => {
	runSequence('webpack:build:prod', 'move', done);
});

gulp.task('build:test', 'Test build and move.', done => {
	runSequence('webpack:build:test', 'move', done);
});

gulp.task('build', 'Build and move.', ['build:dev']); // TODO: Check env.


// DUST COMPILATION:

const DustCompiler = require('gulp-dust-compile-render');
const extensionReplace = require('gulp-ext-replace');

gulp.task('generate', 'Generate HTML pages...', () => {
	return gulp.src(PATHS.PAGES_HTML_TEST)
		.pipe(debug({ title: 'Compiling Dust.js templates...'}))
		.pipe(new DustCompiler({
			name: 'Dani',
			surname: 'Gámez',
			age: '23',
			profession: 'Software Engineer',
			company: 'Netcentric',
		}))
		.pipe(extensionReplace('.html'))
		.pipe(gulp.dest('./dist/pages'));
});

// REST:

const configSrc = require('../../../../leonardo.config');

const conf = require('./../../libs/conf');
const src = require('./../../libs/src');

src.buildTree(conf.prepare(configSrc));
