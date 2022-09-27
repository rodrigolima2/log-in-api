const knex = require("../database/connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mailer = require('../modules/mailer');
const schemaPostUser = require('../validations/schemaPostUser');
const schemaPutUser = require('../validations/schemaPutUser');
const schemaEmail = require('../validations/schemaEmail');

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

const alterarSenha = async (req, res) => {
    const { email } = req.body;
    const { tokenParams } = req.params;

    try {
        if (!tokenParams) {
            await schemaEmail.validate(req.body);

            const user = await knex("users").where({ email }).first();

            if (!user) {
                return res.status(400).json({ message: "O E-mail informado não existe." });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: "30m",
            });

            mailer.sendMail({
                to: email,
                from: 'ipirangapfg@gmail.com',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                template: 'auth/forgot_password',
                context: { token }
            }, (error) => {
                if (error) {
                    return res.status(400).json({ message: error.message })
                }
            });

            return res.status(200).json({});
        }

        if (tokenParams) {
            jwt.verify(tokenParams, process.env.JWT_SECRET);

            const { id } = jwt.decode(tokenParams, process.env.JWT_SECRET);
            const existingUser = await knex("users").where({ id }).first();

            if (!existingUser) {
                return res.status(404).json({ message: "Usuario não encontrado!" });
            }

            const { senha } = req.body;

            await schemaPutUser.validate(req.body);

            const pwdCrypt = await bcrypt.hash(senha, Number(process.env.SALT_ROUNDS));
            const body = { senha: pwdCrypt };
            const updateUser = await knex("users")
                .update(body)
                .where({ id: id });

            if (updateUser === 0) {
                return res
                    .status(500)
                    .json({ message: "Não foi possível atualizar o usuário!" });
            }

            return res.status(200).json({});
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const putUser = async (req, res) => {
    const { user } = req;
    const { nome, sobrenome, email, senha } = req.body;

    try {
        await schemaPutUser.validate(req.body);

        const body = {};

        if (nome) body.nome = nome;
        if (sobrenome) body.sobrenome = sobrenome;
        if (email) {
            const userEmail = await knex("users")
                .whereRaw("email = ? AND id <> ?", [email, user.id])
                .first();

            if (userEmail) {
                return res.status(400).json({ message: "E-mail já cadastrado." });
            }

            body.email = email;
        }
        if (senha) {
            const pwdCrypt = await bcrypt.hash(senha, Number(process.env.SALT_ROUNDS));

            body.senha = pwdCrypt;
        }

        const updateUser = await knex("users")
            .update(body)
            .where({ id: user.id });

        if (updateUser === 0) {
            return res
                .status(500)
                .json({ message: "Não foi possível atualizar o usuário!" });
        }

        return res.status(200).json({});
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getUser,
    postUser,
    alterarSenha,
    putUser
};