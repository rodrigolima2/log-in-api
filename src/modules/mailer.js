const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const transport = nodemailer.createTransport({
    host: process.env.NM_HOST,
    port: process.env.NM_PORT,
    auth: {
        user: process.env.NM_USER,
        pass: process.env.NM_PASS
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