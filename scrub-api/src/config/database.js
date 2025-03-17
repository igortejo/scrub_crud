const { Sequelize } = require("sequelize");
const dotenv = require('dotenv');

dotenv.config();

// Configuração do banco de dados
const env = process.env.NODE_ENV || 'development';
const config = {
  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: "localhost",
    dialect: "mysql",
    logging: false,
  },
  test: {
    database: process.env.DB_NAME_TEST,
    username: process.env.DB_USER_TEST,
    password: process.env.DB_PASS_TEST,
    host: "localhost",
    dialect: "mysql",
    logging: false,
  },
};

const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password, {
  host: config[env].host,
  dialect: config[env].dialect,
  logging: config[env].logging,
});

// Testar a conexão
sequelize
  .authenticate()
  .then(() => console.log(`Conectado ao MySQL (${env}) com sucesso!`))
  .catch((err) => console.error(`Erro ao conectar ao MySQL (${env}):`, err));

module.exports = sequelize;
