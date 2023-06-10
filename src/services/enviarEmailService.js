'use strict'

const log = require('../utils/logUtils');
const nodemailer = require('nodemailer');
const axios = require('axios');

const EMAIL_BICICLETARIO = process.env.EMAIL_BICICLETARIO || "bicicletariogrupoa@gmail.com";
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "xpnbyaknodstgici";

const enviarEmail = async (request, reply) => {

    log.info("Chamando o nodemailer");

    const { email, assunto, mensagem } = request.body;

    const emailValidated = await validateEmail(email);

    console.log("@@@@@@@@@@@@@", emailValidated)

    if(emailValidated){
        const mailOptions = {
            from: EMAIL_BICICLETARIO,
            to: email,
            subject: assunto,
            text: mensagem
        };

        return transporter.sendMail(mailOptions)
            .then(response => {
                log.info(response.response);
                return reply.status(200).send("Envio de email solicitado");

            }).catch(err => {
                log.error({
                    status: err.response ? err.response.status : err.code,
                    statusText: err.response ? err.response.statusText : err.message
                }, "Error trying to send email");
                return reply.status(500).send("Erro na api de envio de emails");
            });
    } else if (!emailValidated){
        return reply.status(404).send("email invalido");
    } else {
        return reply.status(500).send(emailValidated);
    }
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_BICICLETARIO,
        pass: EMAIL_PASSWORD
    }
});

const validateEmail = async (email) => {
    const apiKey = '6MUMNPAB5397UVBPYOSM';
    const response = await axios.get(`https://api.mailboxvalidator.com/v1/validation/single?key=${apiKey}&email=${email}`);

    if (response.status === 200) {
        const result = response.data;

        console.log("¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨", result)

        return (result.is_verified === 'True');
    } else {
        throw new Error('Erro na api de verificação de emails');
    }
}

//TODO:
//status responses: 200 - envio de emaili solicitado, 404 - email não existe, 422 - email com formato invalido

module.exports = {
    enviarEmail,
}