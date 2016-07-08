const PATHS = require('./config/paths');

switch (process.env.NODE_ENV) {

	// PROD. CONFIG:

	case 'prod':
	case 'production':
		module.exports = require(PATHS.WEBPACK_CONFIG_PROD);
		break;

	// TEST CONFIG:

	case 'test':
	case 'testing':
		module.exports = require(PATHS.WEBPACK_CONFIG_TEST);
		break;

	// DEV. CONFIG:

	case 'dev':
	case 'development':
	default:
		module.exports = require(PATHS.WEBPACK_CONFIG_DEV);
}
