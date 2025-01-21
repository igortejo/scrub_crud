import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// faz a chama para a api
app.listen(port, () => {
  console.log(`App rodando em http://localhost:${port}`)
})