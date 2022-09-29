const knex = require("../database/connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const schemaLogin = require("../validations/schemaLogin");

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        await schemaLogin.validate(req.body);

        const user = await knex("users").where({ email }).first();

        if (!user) {
            return res.status(404).json({ message: "O usuário não foi encontrado!" });
        }

        const pwdCorrect = await bcrypt.compare(senha, user.senha);

        if (!pwdCorrect) {
            return res.status(400).json({ message: "Email ou senha não conferem!" });
        }

        const token = jwt.sign({ id: user.id, auth: true }, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const autoLogin = async (req, res) => {
    return res.status(200).json({});
}

module.exports = { login, autoLogin };