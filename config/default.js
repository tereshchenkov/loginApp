const defer = require('config/defer').deferConfig;
const path = require('path');

module.exports = {
    jwtSecret: 'jwtSecret',
    mongoose: {
        uri: 'mongodb://localhost/loginApp',
        options: {
            server: {
                socketOptions: {
                    keepAlive: 1
                },
                poolSize: 5
            }
        }
    },
    crypto: {
        hash: {
            length: 128,
            iterations: process.env.NODE_ENV == 'prodaction' ? 12000 : 1
        }
    },
    template: {
        root: defer( (cfg) => {
            return path.join(cfg.root, 'templates')
        })
    },
    root: process.cwd()
};