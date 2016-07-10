'use strict';

const gulp = require('gulp');
const fs   = require('fs');
const path = require('path');

const PATHS = require('../../../../config/paths');

gulp.task('check:paths', 'Validates paths in paths.js.', done => {
	let totalPaths             = 0;
	let totalPathsUnique       = 0;
	let totalPathsRepeated     = 0;
	let totalPathsWithWildcard = 0;
	let totalPathsOk           = 0;
	let totalPathsWrong        = 0;

	const paths = new Set();

	const addPathToSet = path => {
		++totalPaths;

		const wildcardIndex = path.indexOf('*');

		if (wildcardIndex === -1) {
			if (paths.has(path)) {
				++totalPathsRepeated;
			} else {
				paths.add(path);
			}
		} else {
			++totalPathsWithWildcard;

			const pathWithoutWildcard = path.substr(0, wildcardIndex - 1);

			if (paths.has(pathWithoutWildcard)) {
				++totalPathsRepeated;
			} else {
				paths.add(path);
			}
		}
	};

	const extractPaths = pathsObject => {
		for (const key in pathsObject) {
			if (pathsObject.hasOwnProperty(key)) {
				const value = pathsObject[key];

				if (typeof value === 'string') { // If string, just add to set
					addPathToSet(value);
				} else if (value.constructor === Array) { // If array, add all to set
					value.map(addPathToSet);
				} else if (typeof value === 'object') { // If object, find more paths recursively...
					extractPaths(value);
				}
			}
		}
	};

	extractPaths(PATHS);

	totalPathsUnique = paths.size;

	for (const path of paths) {
		fs.access(path, fs.F_OK, err => {
			if (err) {
				++totalPathsWrong;

				console.log('✖ ' + path); // TODO: Add color.
			} else {
				++totalPathsOk;

				console.log('✔ ' + path); // TODO: Add color.
			}

			if (totalPathsUnique === totalPathsWrong + totalPathsOk) { // TODO: Extract to a stats function
				const uniquePathsCheck = totalPathsUnique === (totalPaths - totalPathsRepeated);
				const okPathsCheck     = totalPathsUnique === totalPathsOk;

				console.log('\n');
				console.log('               TOTAL PATHS: ' + totalPaths);
				console.log('      TOTAL PATHS REPEATED: ' + totalPathsRepeated);
				console.log(' TOTAL PATHS WITH WILDCARD: ' + totalPathsWithWildcard);
				console.log('---------------------------------');
				console.log('        TOTAL UNIQUE PATHS: ' + totalPathsUnique + (uniquePathsCheck ? ' ✔' : ' ✖'));
				console.log('            TOTAL OK PATHS: ' + totalPathsOk + (okPathsCheck ? ' ✔' : ' ✖'));
				console.log('         TOTAL WRONG PATHS: ' + totalPathsWrong + (totalPathsWrong ? ' ✖' : ' ✔'));
				console.log('\n');

				done();
			}
		});
	}
});


gulp.task('check:entry', 'Checks webpack entry points.', err => {

	require('fs').readdirSync(PATHS.PAGES).forEach(page => {
		// TODO: Check that it's the same than inside the config...

		console.log('⚡ ' + path.join(PATHS.PAGES, page, page + '.ts'));
	});

});
