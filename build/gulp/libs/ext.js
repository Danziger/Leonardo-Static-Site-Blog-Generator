'use strict';

function matchMatches(keys, values) {
	const object = {};

	for (const index in keys) {
		if (index > 0) {
			object[keys[index]] = values[index];
		}
	}

	return object;
}

module.exports = {
	matchMatches,
};
