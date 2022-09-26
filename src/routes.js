const express = require('express');
const { verifyLogin } = require('./middlewares/verifyLogin');
const { login, autoLogin } = require('./controllers/login');
const { getUser, postUser, putUser, alterarSenha } = require('./controllers/user');

const routes = express();

routes.post('/login', login);
routes.post('/user', postUser);
routes.post('/alter', alterarSenha);
routes.put('/alter/:tokenParams', alterarSenha);

routes.use(verifyLogin);

routes.get('/login', autoLogin);
routes.get('/user', getUser);
routes.put('/user', putUser);

module.exports = routes;