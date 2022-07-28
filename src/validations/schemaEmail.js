const yup = require('./yupSettings');

const schemaEmail = yup.object().shape({
    email: yup.string().email("Formato de e-mail inválido").strict().required(),
});

module.exports = schemaEmail;