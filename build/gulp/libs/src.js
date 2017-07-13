'use strict';

const path = require('path');
const glob = require('glob');

const inj = require('./../libs/inj');
const ext = require('./../libs/ext');

const PATHS       = require('../../../config/paths');

function _getSources(sources) {
	return Object
		.keys(sources)
		.map(key => {
			return Object.assign({}, sources[key], { key: key });
		})
		.sort((a, b) => {
			const aRefs = a.hasOwnProperty('refs') && a.refs;
			const bRefs = a.hasOwnProperty('refs') && b.refs;

			// TODO: Check self reference...

			if (aRefs && bRefs) {
				if (aRefs.hasOwnProperty(b.key) && bRefs.hasOwnProperty(a.key)) {
					// TODO: Just return a boolean saying if there are circular dependcies or not...

					throw new Error('Circular Dependency Detected');
				} else if (aRefs.hasOwnProperty(b.key)) {
					return 1;
				} else if (bRefs.hasOwnProperty(a.key)) {
					return -1;
				} else {
					return 0;
				}
			} else if (!aRefs && bRefs) {
				return -1;
			} else if (aRefs && !bRefs) {
				return 1;
			} else {
				return 0;
			}
		});
}

function _singleLoad(sourceData, extractorNames, valueExtractorRegExp, file) {
	// TODO: Check if is file or dir

	const content = require(path.join(PATHS.SRC, file));

	return Object.assign({}, typeof content === 'object' ? content :
			content.apply(null, inj.getParams(content, sourceData)),
		ext.matchMatches(extractorNames, file.match(valueExtractorRegExp))
	);
}

function _multiLoad(sourceData, extractorNames, valueExtractorRegExp, files) {
	// TODO: Create object with getter (indexBy) and iter (sort)

	return files.map(file => _singleLoad(sourceData, extractorNames, valueExtractorRegExp, file));
}

function _buildSubtree(language, source, sourceData, root) {
	console.log('\nORIGINAL PATH ' + source.src);

	const workingSrc = source.src
		.replace('{=LANG}', language) // Replace (inject) current language
		.replace(/\{.*}/, '*'); // Replace remaining extractors

	const valueExtractorRegExp = new RegExp(workingSrc.replace(/\*/, '(.*)'), 'i');
	const extractorNames = source.src.match(new RegExp(source.src.replace(/\{[^\=].*}/, '{(.*)}'), 'i'));

	console.log('READING PATH ' + workingSrc);

	const files = glob.sync(workingSrc, { // TODO: options outside, sorround by try-catch
		cwd: root ? PATHS.SRC + '/' + root : PATHS.SRC, // TODO: Do this differently
	});

	if (source.refs) {
		console.log('Needs re-injection!');

		const workingDirectory = source.src
			.split('/')
			.slice(0, -1)
			.join('/')
			.replace('{datetime}', '2016.08.01 - 17:00:00'); // TODO: Do this right!

		Object
			.keys(source.refs)
			.filter(key => typeof source.refs[key] === 'object' && source.refs[key].src)
			.map(key => {
				// TODO: Variables should be injected into workingDirectory!

				// TODO: Other option is to load all replacing variables for * and filter them

				_buildSubtree(language, Object.assign({}, source.refs[key], { key: key }), sourceData, workingDirectory);
			});

		// TODO: Add list of things to reinject

		// TODO: Check which ones can be injected now!

		// TODO: Update sort function to take into account string regs, function refs...
	}

	if (sourceData[source.key]) {
		throw new Error('Already loaded :(');
	}

	const single = source.single;

	if (single === true || (single === undefined && files.length === 1)) {
		console.log('Single load: ');

		console.log(files);
		console.log(workingSrc);
		console.log(root || PATHS.SRC);

		sourceData[source.key] = _singleLoad(sourceData, extractorNames, valueExtractorRegExp, files[0]);
	} else if (single === false || (single === undefined && files.length > 1)) {
		console.log('Multi (' + files.length + ') load: ');

		sourceData[source.key] = _multiLoad(sourceData, extractorNames, valueExtractorRegExp, files);
	} else if (files.length === 0) {
		sourceData[source.key] = null;
	} else {
		throw new Error('Could not load data :(');
	}
}

/**
 * @param config
 * @private Builds the sources tree for the given language.
 */
function _buildTree(language, sourcesQueue) {
	const sourceData = {};

	console.log('\n----------------------------------------------------------------');
	console.log('BUILDING ' + language + '...');

	for (const source of sourcesQueue) {
		_buildSubtree(language, source, sourceData);
	}

	return sourceData;
}

function buildTree(config) {
	const sourcesQueue = _getSources(config.sources);
	const sourcesData = {};

	console.log('\n----------------------------------------------------------------');
	console.log('ACTIVE LANGUAGES: ' + config.activeLanguages.join(', '));

	config.activeLanguages.map(language => sourcesData[language] = _buildTree(language, sourcesQueue));

	console.log('\n\nFINAL STUFF');
	console.log(sourcesData.en);

	// console.log('\n\nPOSTS[0]');
	// console.log(sourcesData.en.posts[0]);
}

module.exports = {
	buildTree,
};
