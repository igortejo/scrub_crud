import { Router } from "express";
import {listarProdutos, criarProduto, atualizarProduto, deletarProduto} from '../service/produto'

const router = Router()

router.get('/', async (req, res) => {
    const produtosLista = await listarProdutos()
    res.send(produtosLista)
})

router.post('/', async (req, res) => {
    const produtoCriado = await criarProduto(req.body)
    res.status(201).send(produtoCriado)
})

router.put('/', (req, res) => {
    res.send('Put ok')
})

router.delete('/', (req, res) => {
    res.send('Delete ok')
})

export default router