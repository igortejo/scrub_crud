import sequelize from './config/database.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import pedidoRoutes from './routes/pedidoRoutes.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
import produtoRoutes from './routes/produtoRoutes.js'
import authRoutes from "./routes/auth.js"


const port = 3000
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

export default app;


