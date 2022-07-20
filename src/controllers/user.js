const knex = require("../database/connection");
const bcrypt = require("bcrypt");
const schemaPostUser = require('../validations/schemaPostUser');

const getUser = async (req, res) => {
    const { user } = req;
    return res.status(200).json(user);
};

const postUser = async (req, res) => {
    const { nome, sobrenome, email, senha } = req.body;

    try {
        await schemaPostUser.validate(req.body);

        const userEmail = await knex("users").where({ email }).first();

        if (userEmail) {
            return res.status(400).json({ message: "E-mail já cadastrado." });
        }

        const pwdCrypt = await bcrypt.hash(senha, Number(process.env.SALT_ROUNDS));

        const insertUser = await knex("users").insert({
            nome,
            sobrenome,
            email,
            senha: pwdCrypt,
        });

        if (insertUser === 0) {
            return res.status(500).json({ message: "Não foi possível cadastrar." });
        }

        return res.status(201).json({});
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const putUser = async (req, res) => {

};

module.exports = {
    getUser,
    postUser,
    putUser
};