'use strict'

const fastify = require('fastify');

const build = (opts = {}) => {
    const app = fastify(opts);

    app.register(require('./routes/helloWorldRoute'));
    app.register(require('./routes/transactionsRoutes'));

    return app;
}

module.exports = {
    build,
}