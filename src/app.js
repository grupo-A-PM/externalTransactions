'use strict'

const fastify = require('fastify');

const build = (opts = {}) => {
    const app = fastify(opts);

    app.register(require('./routes/helloWorldRoute'));
    app.register(require('./routes/enviarEmailRoute'))
    //Todo:
    //ver o que tem que fixar exposto ou nao
    //POST /enviarEmail
    //POST /cobranca
    //POST /processaCobrancasEmFila
    //POST /filaCobranca
    //GET /cobranca/{idCobranca}
    //POST /validaCartaoDeCredito


    return app;
}

module.exports = {
    build,
}