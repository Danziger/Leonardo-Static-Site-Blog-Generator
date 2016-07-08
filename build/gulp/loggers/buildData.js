'use strict';

// TODO: Are we gonna use this?

const path = require('path');
const _generatedFilesPaths = [];
const _onFileGenerated = function(filePath) {
    _generatedFilesPaths.push(filePath);
};

process.on('nn:fileGenerated', _onFileGenerated);

module.exports = {
    getPathsToGeneratedFiles(extensionFilter) {
        // add the dot for easier comparison
        const extFilter = `.${extensionFilter}`;

        if (typeof extFilter === 'undefined') {
            return _generatedFilesPaths;
        }

        return _generatedFilesPaths.filter(function(filePath) {
            return path.extname(filePath) === extFilter;
        });
    },
};
