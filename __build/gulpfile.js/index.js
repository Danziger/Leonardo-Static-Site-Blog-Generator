'use strict';

const _             = require('underscore');
const clc           = require('cli-color');
const gulp          = require('gulp-help')(require('gulp')); // Wrapper around gulp to add help messages...
const path          = require('path');
const runSequence   = require('run-sequence');

const taskHelper    = require('./libs/taskHelper');

const ENV   = require('./libs/env');
const PATHS = require('../../__config/paths');


/***********************************************************************************************************************
	1. TASK CLASSIFICATION BY ENVIROMENT:

	Grouped by different phases of the build and by what can run in parallel.
**/

// Default values:

let BEFORE_CODE = ['tslint'];
let CODE        = ['webpack'];
let AFTER_CODE  = ['move'];
let DELAYED     = [];
let ALL         = _.flatten([BEFORE_CODE, CODE, AFTER_CODE, DELAYED]);
let EXCLUDE     = ['default', 'tslint'];

if (ENV.DEV) { // Set most tasks to DELAYED since they should be only executed by watchers:
	BEFORE_CODE = [];
	CODE        = [];
	AFTER_CODE  = ['watch'];
	DELAYED     = ['tslint', 'webpack', 'move'];
	ALL         = _.flatten([BEFORE_CODE, CODE, AFTER_CODE, DELAYED]);
	EXCLUDE     = ['default', 'tslint'];
} else if (ENV.PRE) { // Nothing to do here, yet...
	BEFORE_CODE = [];
	CODE        = [];
	AFTER_CODE  = [];
	DELAYED     = [];
	ALL         = _.flatten(['default', BEFORE_CODE, CODE, AFTER_CODE, DELAYED]);
	EXCLUDE     = ALL;
}

/***********************************************************************************************************************
	2. SETUP LOGERS:

	Grouped by different phases of the build and by what can run in parallel.
**/

// TODOO: Require / configure my own loader that will be used inside all gulp tasks...

// require('./loggers/buildData');
// require('./loggers/webpack');

/***********************************************************************************************************************
	3. INIT GULP TASKS:

	Require ALL tasks files and thus setup the gulp tasks...
**/

for (const task of ALL) {
	if (EXCLUDE.indexOf(task) !== -1) {
		console.log(clc.yellow('\nI Skipping task: ' + task));
		continue;
	}

	try {
		require(path.join(PATHS.BUILD, 'gulpfile.js', 'tasks', task));
	} catch (err) {
		console.error(clc.red('\n! Error while loading gulp task: ' + task));
		console.error('  ' + clc.red(err));
	}
}

/*
require('fs').readdirSync(PATHS.BUILD).forEach(name => {
	if (EXCLUDE.indexOf(name) === -1) {
		try {
			require(path.join(PATHS.BUILD, name));
		} catch (err) {
			console.log('! Error while loading gulp task: ' + name);
			console.log(err);
		}
	}
});
*/


/*
gulp.task('default', function(cb) {
	const taskSets = [BEFORE_CODE, CODE, AFTER_CODE];
	const sequence = taskHelper.combineTasksSetsToGulpTaskSequence(taskSets);

	if (sequence.length) {
		sequence.push(cb);
		runSequence.apply(null, sequence);
	} else {
		cb();
	}
});
*/





// TODO: "Check paths" task...


// if no task was configured when gulp was executed,
// the default task (tasks/default.js) is called








// TODO: END






// IMPORT ALL "gulp-.+" MODULES:

// const $ = require('gulp-load-plugins')({ lazy: true });


// GULP AND GULP 4 POLYFILL:gulp

// const runSequence = require('run-sequence');
/*
const originalGulpTask = gulp.task;

gulp.task = function(name, dependencies, callback) {
	if (dependencies) {
		dependencies.push(callback);

		originalGulpTask(name, () => {
			runSequence.apply(dependencies);
		});
	} else {
		originalGulpTask(name, callback);
	}
};

gulp.series = function() {
	return Array.prototype.slice.call(arguments);;
};

gulp.parallel = function() {
	return Array.prototype.slice.call(arguments);;
};

console.log(gulp.series('build-clean', gulp.parallel('build-scripts', 'build-styles'), 'build-html'));
*/

// TODO: Pensar si no es mejor utilizarlo en beta...


// FUNCTIONS: //////////////////////////////////////////////////////////////////////////////////////////////////////////

// TODO: Add color parameter that check among possibles and defaults to XXX:
function log(msg) {
	if (typeof msg === 'object') {
		for (const item in msg) {
			if (msg.hasOwnProperty(item)) {
				$.util.log('\n\n' + $.util.colors.blue(msg[item]) + '\n');
			}
		}
	} else {
		$.util.log('\n\n' + $.util.colors.blue(msg) + '\n');
	}
}

function notify(options) {
	require('node-notifier').notify(_.assign({
		sound: 'Bottle',
		contentImage: path.join(__dirname, 'gulp.png'),
		icon: path.join(__dirname, 'gulp.png'),
	}, options));
}







// TASKS: //////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TODO: Add console colors like in crawler

gulp.task('hello-world', 'hdskj fj fkfj dhfjk dshfjk dshfjk dsdhsjk fkfk dhf fk sd', () => {
	// log('HELLO WORLD:');

	notify({
		title: 'gulp hello-world',
		subtitle: 'Just a simple test task',
		message: 'Running `gulp hello-world`',
	});

	// $.util.log($.util.colors.yellow('Our first gulp task!'));
});
