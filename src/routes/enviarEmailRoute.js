'use strict'

const emailSchema = require('./schemas/emailSchema');
const emailService = require('../services/enviarEmailService')

const routes = async (fastify) => {
    fastify.post('/enviarEmail', emailSchema, emailService.enviarEmail)
}

module.exports = routes;