'use strict';

const clc  = require('cli-color');
const gulp = require('gulp-help')(require('gulp')); // Wrapper around gulp to add help messages...
const path = require('path');

const ENV   = require('./build/gulp/libs/env'); // TODO: Refactor and move to config
const PATHS = require('./config/paths');

/***********************************************************************************************************************
 1. SETUP LOGERS:

 Grouped by different phases of the build and by what can run in parallel.
 **/

// TODOO: Require / configure my own logger that will be used inside all gulp tasks...
// TODO: Add console colors like in crawler

// require('./loggers/buildData');
// require('./loggers/webpack');

/***********************************************************************************************************************
 2. INIT GULP TASKS:

 Require ALL tasks files and thus setup the gulp tasks...
 **/

const EXCLUDE = [];

require('fs').readdirSync(PATHS.GULP_TASKS).forEach(task => {
	if (EXCLUDE.indexOf(task) === -1) {
		try {
			require(path.join(PATHS.GULP_TASKS, task));
		} catch (err) {
			console.log('! Error while loading gulp task: ' + task);
			console.log(err);
		}
	}
});
