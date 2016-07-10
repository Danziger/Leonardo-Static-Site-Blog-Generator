'use strict';

const gulp = require('gulp');

const PATHS = require('../../../../config/paths');

gulp.task('watch:dev', 'Watches for changes to trigger the development build.', done => {
	gulp.start('build:dev');

	// TS, SCSS and EJS files: Regenerate webpack bundle and move generated files for Jekyll...
	gulp.watch([PATHS.TS_FILES, PATHS.SCSS_FILES, PATHS.PAGES_HTML], ['build:dev']);

	// HTML files: Moves HTML files to _includes/components
	gulp.watch(PATHS.COMPONENTS_HTML, ['move:components']);

	done();
});

gulp.task('watch:prod', 'Watches for changes to trigger the production build.', done => {
	gulp.start('build:prod');

	// TS, SCSS and EJS files: Regenerate webpack bundle and move generated files for Jekyll...
	gulp.watch([PATHS.TS_FILES, PATHS.SCSS_FILES, PATHS.PAGES_HTML], ['build:prod']);

	// HTML files: Moves HTML files to _includes/components
	gulp.watch(PATHS.COMPONENTS_HTML, ['move:components']);

	done();
});

gulp.task('watch:test', 'Watches for changes to trigger the test build.', done => {
	gulp.start('build:test');

	// TS, SCSS and EJS files: Regenerate webpack bundle and move generated files for Jekyll...
	gulp.watch([PATHS.TS_FILES, PATHS.SCSS_FILES, PATHS.PAGES_HTML], ['build:test']);

	// HTML files: Moves HTML files to _includes/components
	gulp.watch(PATHS.COMPONENTS_HTML, ['move:components']);

	done();
});

gulp.task('watch', 'Watches for changes to trigger the build.', ['watch:dev']); // TODO: Check env.
