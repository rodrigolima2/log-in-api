const express = require('express');
const { verifyLogin } = require('./middlewares/verifyLogin');
const { login, autoLogin } = require('./controllers/login');
const { getUser, postUser, putUser } = require('./controllers/user');

const routes = express();

routes.post('/login', login);
routes.post('/user', postUser);
routes.put('/user', putUser);

routes.use(verifyLogin);

routes.get('/login', autoLogin);
routes.get('/user', getUser);

module.exports = routes;