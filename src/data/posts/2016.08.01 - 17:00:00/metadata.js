const AUTHORS = require('./../../authors/authors.js');
const TAGS = require('./../../tags/tags.js'); // Default language

module.exports = function(AUTHORS, TAGS, BODY) {
	return {
		// Automatically attached attributes (extracted from files):
		//  - Title
		//  - DateTime

		// Authors:
		authors: [AUTHORS.DANI],

		// Special Tags:
		area: TAGS.AREA.ELGOTIC,
		type: TAGS.TYPE.RESTAURANT,

		// Generic Tags:
		tags: [],

		// Body (markup):
		body: BODY,
	};
};
