const yup = require("./yupSettings");

const loginSchema = yup.object().shape({
    email: yup.string().email("Formato de e-mail inválido").required(),
    senha: yup.string().min(8).max(20).strict().required(),
});

module.exports = loginSchema;