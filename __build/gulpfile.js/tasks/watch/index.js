'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const runSequence = require('run-sequence');
const sassPaths = require('../sass/paths');
const paths = require('../../paths');

gulp.task('watch', function(watchTaskCallback) {
    gutil.log(gutil.colors.green('Starting file watchers...'));

    // Linting
    gulp.watch(paths.tsPublishFiles, ['tslint']);

    // JS files
    gulp.start('webpack-publish');

    // CSS files
    gulp.watch(sassPaths.publishFiles, ['watch-css-publish']);
    gulp.watch(sassPaths.authorFiles, ['watch-css-author']);
    gulp.watch(sassPaths.commonFiles, ['watch-css-common']);

    watchTaskCallback();
});

gulp.task('watch-js-publish', function(cb) {
    runSequence('webpack-publish', cb);
});

gulp.task('watch-css-publish', function(cb) {
    runSequence('sassPublish', 'cssconcatPublish', cb);
});

gulp.task('watch-css-author', function(cb) {
    runSequence('sassAuthor', 'cssconcatAuthor', cb);
});

gulp.task('watch-css-common', function(cb) {
    runSequence('sassResetCachedStyles', 'sass', 'cssconcat', cb);
});
