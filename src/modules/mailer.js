const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

/*
const transport = nodemailer.createTransport({
    host: process.env.NM_HOST,
    port: process.env.NM_PORT,
    auth: {
        user: process.env.NM_USER,
        pass: process.env.NM_PASS
    }
});
*/

const transport = nodemailer.createTransport({
    host: process.env.GM_HOST,
    port: process.env.GM_PORT,
    service: process.env.GM_SERVICE,
    secure: process.env.GM_SECURE,
    auth: {
        user: process.env.GM_USER,
        pass: process.env.GM_PASS
    }
});

transport.use('compile', hbs({
    viewEngine: {
        defaultLayout: undefined,
        partialsDir: path.resolve('./src/resources/mail/')
    },
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html',
}));

module.exports = transport;