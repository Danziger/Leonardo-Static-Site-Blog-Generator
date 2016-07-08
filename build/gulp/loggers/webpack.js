'use strict';

// TODO: Are we gonna use this?

const gutil = require('gulp-util');
const time = require('../libs/time');

function onWebpackBundlesParsed(stats) {
    const compileTime = time.prettify(stats.endTime - stats.startTime);

    if (stats.compilation.warnings.length) {
        gutil.log(gutil.colors.yellow(stats));
    }
    gutil.log(
        'Compiled with', gutil.colors.cyan('webpack'), 'in',
        gutil.colors.magenta(compileTime)
    );
}

process.on('nn:webpackBundlesParsed', onWebpackBundlesParsed);
