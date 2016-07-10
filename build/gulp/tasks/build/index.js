'use strict';

const gulp        = require('gulp');
const runSequence = require('run-sequence');

gulp.task('build:dev', 'Development build and move.', done => {
	runSequence('webpack:build:prod', 'move', done);
});

gulp.task('build:prod', 'Production build and move.', done => {
	runSequence('webpack:build:dev', 'move', done);
});

gulp.task('build:test', 'Test build and move.', done => {
	runSequence('webpack:build:test', 'move', done);
});

gulp.task('build', 'Build and move.', ['build:dev']); // TODO: Check env.
