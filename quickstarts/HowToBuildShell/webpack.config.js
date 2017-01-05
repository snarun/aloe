// module.exports = require('./config/webpack.dev.js');

switch (process.env.ENV) {
    case 'prod':
    case 'production':
        module.exports = require('./config/webpack.dev.js');
        break;
    case 'test':
    case 'testing':
        module.exports = require('./config/webpack.dev.js');
        break;
    case 'dev':
    case 'development':
        module.exports = require('./config/webpack.dev.js');
        break;
    default: 
        module.exports = require('./config/webpack.dev.js');
}
