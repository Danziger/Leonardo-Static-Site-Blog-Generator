'use strict';

const gulp = require('gulp');

const PATHS = require('../../../../config/paths');

gulp.task('watch', 'Watches for changes, triggers webpack and moves files.', done => {
    gulp.start('webpack:build-dev');

    // TS, SCSS and EJS files: Regenerate webpack bundle and move generated files for Jekyll...
    gulp.watch([PATHS.TS_FILES, PATHS.SCSS_FILES, PATHS.EJS_FILES], ['build']);

    // HTML files: Moves HTML files to _includes/components
    gulp.watch(PATHS.HTML_FILES, ['move:components']);

    done();
});
