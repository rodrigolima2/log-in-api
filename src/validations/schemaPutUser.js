const yup = require('./yupSettings');

const schemaPutUser = yup.object().shape({
    nome: yup.string().strict().notRequired(),
    sobrenome: yup.string().strict().notRequired(),
    email: yup.string().email("Formato de e-mail inválido").strict().notRequired(),
    senha: yup.string().min(8).max(20).strict().notRequired(),
});

module.exports = schemaPutUser;