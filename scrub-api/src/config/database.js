const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

// Configuração do banco de dados
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

// Testar a conexão
sequelize
  .authenticate()
  .then(() => console.log("Conectado ao MySQL com sucesso!"))
  .catch((err) => console.error("Erro ao conectar ao MySQL:", err));

  module.exports = sequelize;
