const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
    host: "ssl0.ovh.net",
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAILING_ADRESS,
        pass: process.env.PASSWORD_MAIL
    },

})


module.exports = transporter;

