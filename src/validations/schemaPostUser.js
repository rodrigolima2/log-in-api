const yup = require("./yupSettings");

const registerUserSchema = yup.object().shape({
    nome: yup.string().required(),
    sobrenome: yup.string().required(),
    email: yup.string().email("Formato de e-mail inválido").required(),
    senha: yup.string().min(8).max(20).strict().required(),
});

module.exports = registerUserSchema;