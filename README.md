# Página de Login API

#### Banco de Dados

##### Tabela

- Usuário

##### Campos

- id (primary key)
- nome
- sobrenome
- email
- senha

#### Criar as rotas

##### GET
- /login - verifica se o token ainda é valido pois a rota só pode ser acessada com o token.
- /user - Retorna as informações do usuário logado

##### POST

- /login - Recebe os dados enviados pelo front, verifica se o email existe, se sim verifica se a senha esta correta e então retorna um token como resposta permitindo o login

- /user - Realiza o cadastro do usuário com os dados recebidos do front

##### PUT

- /user - Altera determinado campo do usuário dependendo do dado recebido

##### PASSO A PASSO

- [x] inicializar o projeto com git init
- [x] Instalar bibliotecas que serão utilizadas (nodemon, bcrypt, dotenv, yup, etc)
- [x] Fazer as configurações básicas do servidor
- [x] Criar um arquivo .env com informações sensíveis do banco de dados e algumas outras configuraçoes como a JWT_SECRET utilizada na hora de configurar o token 
- [x] Criar a conexão com o banco de dados utilizando a biblioteca knex junto com a bibliotéca pg específica para conectar com o banco Postgresql
- [x] Criar as rotas
- [x] Criar os controllers
- [x] Criar as validações com yup para validar os dados antes de serem enviados para o banco
- [x] encryptar a senha do usuário utilizando a bibliotéca bcrypt
- [x] gerar um token utilizando a biblioteca jsonwebtoken e retorná-lo quando o usuário fizer login com sucesso
- [x] Criar um middleware que verifica se o usuário está logado através de um token válido