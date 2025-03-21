const sequelize = require('./config/database.js');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const pedidoRoutes = require('./routes/pedidoRoutes.js');
const usuarioRoutes = require('./routes/usuarioRoutes.js');
const produtoRoutes = require('./routes/produtoRoutes.js');
const authRoutes = require('./routes/auth.js');


const port = 3000
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors()); //evitar bloqueios de requisição

//sincronização do banco de dados
sequelize
.sync({ alter: true  }) // Atualiza a estrutura da tabela sem perder dados
.then(() => {
  console.log("Tabelas sincronizadas com sucesso!");
  // faz a chamada para a api
  app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
  })
  .catch((err) => console.error("Erro ao sincronizar tabelas:", err));


// é meio que uma rota que chama o controller
app.use('/usuario', usuarioRoutes)
app.use('/produto', produtoRoutes)
app.use('/pedido', pedidoRoutes)
app.use('/auth', authRoutes)

module.exports = app;


