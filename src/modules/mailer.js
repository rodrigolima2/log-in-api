const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: process.env.NM_HOST,
    port: process.env.NM_PORT,
    auth: {
        user: process.env.NM_USER,
        pass: process.env.NM_PASS
    }
});

module.exports = transport;