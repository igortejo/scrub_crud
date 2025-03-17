const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app'); // Importe sua aplicação
const db = require('../src/config/database'); // Importe a configuração do banco

chai.use(chaiHttp);
const { expect } = chai;

// Configuração do banco de dados antes dos testes
before(async () => {
  await db.sync({ force: true }); // Recria as tabelas antes dos testes
});

// Limpeza do banco de dados após os testes
after(async () => {
  await db.close(); // Fecha a conexão com o banco
});

module.exports = { chai, expect, app, db };