'use strict';

const STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
const ARGUMENT_NAMES = /([^\s,]+)/g;


function getParamNames(fn) {
	// Source: http://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically-from-javascript/1007997#1007997

	const fnStr = fn.toString().replace(STRIP_COMMENTS, '');
	const result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);

	return result === null ? [] : result;
}

function getParamNamesKeys(f) {
	return getParamNames(f).map(str => str.toLowerCase());
}

function getParams(fn, sources) {
	return getParamNamesKeys(fn).map(key => {
		if (sources[key]) {
			return sources[key];
		} else {
			console.log('MISSING PARAM ' + key);
			// TODO: FInish this. The idea is good
			sources[key] = {};
			return sources[key];
		}
	});
}

module.exports = {
	getParams,
};
