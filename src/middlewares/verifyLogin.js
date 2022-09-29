const knex = require("../database/connection");
const jwt = require("jsonwebtoken");

const verifyLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: "Não autorizado." });
    }

    try {
        const token = authorization.replace("Bearer ", "").trim();

        jwt.verify(token, process.env.JWT_SECRET);

        const { id, auth } = jwt.decode(token, process.env.JWT_SECRET);

        if (!auth) return res.status(401).json({ message: "Não autorizado." });

        const existingUser = await knex("users").where({ id }).first();

        if (!existingUser) {
            return res.status(404).json({ message: "Usuario não encontrado!" });
        }

        const { senha, ...user } = existingUser;

        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = { verifyLogin };