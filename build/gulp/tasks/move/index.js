'use strict';

const debug     = require('gulp-debug');
const gulp      = require('gulp');
const rename    = require('gulp-rename');

const PATHS     = require('../../../../config/paths');

gulp.task('move:pages', 'Moves generated pages to jekyll/_pages.', () => {
	// the base option sets the relative root for the set of files,
	// preserving the folder structure

	gulp.src(PATHS.PAGES_HTML)
		// .pipe(debug({ title: 'Moving'}))
		.pipe(gulp.dest('./jekyll/_pages'));
});

gulp.task('move:inline', 'Moves generated inline CSS to jekyll/_includes/css.', () => {
	gulp.src(PATHS.DIST_INLINE_CSS)
		// .pipe(debug({ title: 'Moving'}))
		.pipe(gulp.dest('./jekyll/_includes/css'));
});

gulp.task('move:js', 'Moves generated JS to jekyll/js.', () => {
	gulp.src(PATHS.DIST_JS)
		// .pipe(debug({ title: 'Moving'}))
		.pipe(gulp.dest('./jekyll/js'));
});

gulp.task('move:css', 'Moves generated CSS to jekyll/css.', () => {
	gulp.src(PATHS.DIST_STYLES)
		// .pipe(debug({ title: 'Moving'}))
		.pipe(gulp.dest('./jekyll/css'));
});

gulp.task('move:components', 'Moves components HTML to jekyll/_includes/components.', () => {
	gulp.src(PATHS.COMPONENTS_HTML)
		// .pipe(debug({ title: 'Moving' }))
		.pipe(rename({ dirname: '' })) // Don't preserve folder structure
		.pipe(gulp.dest('./jekyll/_includes/components'));
});

gulp.task('move', 'Moves all generated files to jekyll.', [
	'move:pages',
	'move:inline',
	'move:js',
	'move:css',
	'move:components',
], () => {
	console.log('Files moved.');
});

// TODO: Check http://stackoverflow.com/questions/25928170/determining-if-gulp-task-called-from-another-task for logging
// messages