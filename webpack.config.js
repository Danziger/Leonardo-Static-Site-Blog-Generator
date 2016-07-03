// Look in ./_config folder for webpack config depending on environment:

switch (process.env.NODE_ENV) {

	// PROD. CONFIG:

	case 'prod':
	case 'production':
		module.exports = require('./__config/webpack.prod');
		break;

	// TEST CONFIG:

	case 'test':
	case 'testing':
		module.exports = require('./__config/webpack.test');
		break;

	// DEV. CONFIG:

	case 'dev':
	case 'development':
	default:
		module.exports = require('./__config/webpack.dev');

}