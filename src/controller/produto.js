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

router.put('/:id', async (req, res) => {
    const produtoAtualizado = await atualizarProduto(req.params.id, req.body)
    res.send(produtoAtualizado)
})

router.delete('/:id', async (req, res) => {
    const produtoDeletado = await deletarProduto(req.params.id)
    res.send(produtoDeletado)
})

export default router