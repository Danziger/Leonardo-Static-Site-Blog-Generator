'use strict';

// TODO: Are we gonna use this?

const tagStripIndent = require('common-tags').stripIndent;
const argv = require('yargs').argv;

let NODE_ENV;

const env = {
    get PRE() {
        return NODE_ENV === 'pre-commit';
    },

    get DEV() {
        return NODE_ENV === 'development';
    },

    get PROD() {
        return NODE_ENV === 'production';
    },

    getVar(envVar) {
        if (typeof process.env[envVar] !== 'undefined') {
            return process.env[envVar];
        }

        if (typeof argv[envVar] !== 'undefined') {
            return argv[envVar];
        }

        const errorMsg = tagStripIndent `

                -- ERROR IN GULP SCRIPT
                Property '${envVar}' does not exist in 'process.env'
                nor is it passed as an argument to the process.

                -- Content of process.env
                ${JSON.stringify(process.env)}

                -- Passed arguments to gulp script
                ${JSON.stringify(argv)}
            `;

        throw new ReferenceError(errorMsg);
    },
};

try {
    NODE_ENV = env.getVar('NODE_ENV');
} catch (e) {
    NODE_ENV = 'production'; // Default ENV
}

module.exports = env;
