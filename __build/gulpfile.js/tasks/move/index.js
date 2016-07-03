'use strict';

const debug = require('gulp-debug');
const gulp = require('gulp');

const PATHS = require('../../../../__config/paths');

// TODO: This can be done differently...

// TODO: Create other move functions, change paths (__dist), create clean functions...

// TODO: Pages lab are nested...

// TODO: Move straigh to site or create both options...



const filesToMove = {
	pages: ['../__dist/*.html'],
	inline: ['../__dist/*.inline.css', '../__dist/*.inline.css.map'],
	js: ['../__dist/*.js', '../__dist/*.js.map'],
	css: ['../__dist/styles.css', '../__dist/styles.css.map'],
};

gulp.task('move:pages', 'Moves files in __dist to the right location to make Jekyll compile them.', () => {
	// the base option sets the relative root for the set of files,
	// preserving the folder structure
	gulp.src(filesToMove.pages)
		.pipe(debug({ title: 'Moving'}))
		.pipe(gulp.dest('../_pages'));
});

gulp.task('move:inline', 'Moves files in __dist to the right location to make Jekyll compile them.', () => {
	// the base option sets the relative root for the set of files,
	// preserving the folder structure
	gulp.src(filesToMove.inline)
		.pipe(debug({ title: 'Moving'}))
		.pipe(gulp.dest('../_includes/css'));
});

gulp.task('move:js', 'Moves files in __dist to the right location to make Jekyll compile them.', () => {
	// the base option sets the relative root for the set of files,
	// preserving the folder structure
	gulp.src(filesToMove.js)
		.pipe(debug({ title: 'Moving'}))
		.pipe(gulp.dest('../js'));
});

gulp.task('move:css', 'Moves files in __dist to the right location to make Jekyll compile them.', () => {
	// the base option sets the relative root for the set of files,
	// preserving the folder structure
	gulp.src(filesToMove.css)
		.pipe(debug({ title: 'Moving'}))
		.pipe(gulp.dest('../css'));
});

gulp.task('move', 'Moves files in __dist to the right location to make Jekyll compile them.', [
	'move:pages',
	'move:inline',
	'move:js',
	'move:css',
]);
