'use strict'

const log = require('../utils/logUtils');
const nodemailer = require('nodemailer');

const enviarEmail = async (request, reply) => {

    log.info("Chamando o nodemailer", request);

    const mailOptions = {
        from: 'bicicletariogrupoa@gmail.com',
        to: request.email,
        subject: request.assunto,
        text: request.mensagem
    };

    const response = transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    return reply.status(response.statusCode).send(response);
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bicicletariogrupoa@gmail.com',
        pass: 'bicicleta123'
    }
});

module.exports = {
    enviarEmail,
}