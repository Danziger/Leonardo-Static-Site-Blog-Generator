'use strict';

function _prepareLanguages(srcConfig) {
	const languages = (srcConfig.languages || []).map(language => language.toLowerCase());

	let activeLanguages = srcConfig.activeLanguages || [];

	if (activeLanguages.length > 0) {
		activeLanguages = srcConfig.activeLanguages
			.map(language => language.toLowerCase())
			.filter(language => languages.indexOf(language) !== -1);
	}

	if (activeLanguages.length === 0) {
		activeLanguages = ['DEF']; // TODO: Implement support for DEF!
	}

	// TODO: Remaining bits?
	const activeLanguagesGlobPartial = '*(' + activeLanguages.map(activeLanguage => '.' + activeLanguage).join('|') + ')';
	// TODO: END Remaining bits?

	return Object.assign({}, srcConfig, { languages, activeLanguages });
}

function prepare(srcConfig) {
	return _prepareLanguages(srcConfig);
}

module.exports = {
	prepare,
};
