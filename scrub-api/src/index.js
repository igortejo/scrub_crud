import express from 'express'
import bodyParser from 'body-parser'
import cors from "cors"
import authRoutes from "./routes/auth"
import pedidoRoutes from './routes/pedidoRoutes'
import usuarioRoutes from './routes/usuarioRoutes'
import produtoRoutes from './routes/produtoRoutes'


const app = express()
const port = 3000


app.use(bodyParser.json()) // faz com que pegue os dados que são passados no body da requisição e transforme em um json
app.use(cors())  //evitar conflitos quando tiver rodando localmente


// é meio que uma rota que chama o controller
app.use('/produto', produtoRoutes)
app.use('/usuario', usuarioRoutes)
app.use('/pedido', pedidoRoutes)
app.use('/auth', authRoutes)


// faz a chamada para a api
app.listen(port, () => {
  console.log(`App rodando em http://localhost:${port}`)
})