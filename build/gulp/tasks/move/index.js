'use strict';

const debug = require('gulp-debug');
const gulp = require('gulp');
const rename = require('gulp-rename');

const PATHS = require('../../../../config/paths');

// TODO: This can be done differently...

// TODO: Create other move functions, change paths (dist), create clean functions...

// TODO: Pages lab are nested...

// TODO: Move straigh to site or create both options...


// TODO: Put in PATHS...

const filesToMove = {
	pages: ['../dist/*.html'],
	components: ['../src/components/**/*.html'],
	inline: ['../dist/*.inline.css', '../dist/*.inline.css.map'],
	js: ['../dist/*.js', '../dist/*.js.map'],
	css: ['../dist/styles.css', '../dist/styles.css.map'],
};

gulp.task('move:pages', 'Moves files in dist to the right location to make Jekyll compile them.', () => {
	// the base option sets the relative root for the set of files,
	// preserving the folder structure
	gulp.src(filesToMove.pages)
		.pipe(debug({ title: 'Moving'}))
		.pipe(gulp.dest('../jekyll/_pages'));
});

gulp.task('move:inline', 'Moves files in dist to the right location to make Jekyll compile them.', () => {
	// the base option sets the relative root for the set of files,
	// preserving the folder structure
	gulp.src(filesToMove.inline)
		.pipe(debug({ title: 'Moving'}))
		.pipe(gulp.dest('../jekyll/_includes/css'));
});

gulp.task('move:js', 'Moves files in dist to the right location to make Jekyll compile them.', () => {
	// the base option sets the relative root for the set of files,
	// preserving the folder structure
	gulp.src(filesToMove.js)
		.pipe(debug({ title: 'Moving'}))
		.pipe(gulp.dest('../jekyll/js'));
});

gulp.task('move:css', 'Moves files in dist to the right location to make Jekyll compile them.', () => {
	// the base option sets the relative root for the set of files,
	// preserving the folder structure
	gulp.src(filesToMove.css)
		.pipe(debug({ title: 'Moving'}))
		.pipe(gulp.dest('../jekyll/css'));
});

gulp.task('move:components', 'Moves files in dist to the right location to make Jekyll compile them.', () => {
	// the base option sets the relative root for the set of files,
	// preserving the folder structure
	gulp.src(filesToMove.components)
		.pipe(debug({ title: 'Moving' }))
		.pipe(rename({ dirname: '' })) // Don't preserve folder structure
		.pipe(gulp.dest('../jekyll/_includes/components'));
});

// TODO: Move components (to includes)...

gulp.task('move', 'Moves files in dist to the right location to make Jekyll compile them.', [
	'move:pages',
	'move:inline',
	'move:js',
	'move:css',
	'move:components',
]);
