const { NODE_ENV, PORT, HOST, DOMAIN } = process.env;

const config = {};

config.isDev = NODE_ENV !== 'production';
config.host = (HOST || 'localhost');
config.port = (PORT || 3000);
config.domain = DOMAIN;
config.jwtSecret = 'JWTSECRET';

module.exports = config;
