import {listarProdutos, criarProduto, atualizarProduto, deletarProduto} from '../service/produto.js'


export const listarProdutosController = async (req, res) => {
    const produtosLista = await listarProdutos()
    res.send(produtosLista)
}

export const criarProdutoController = async (req, res) => {
    const produtoCriado = await criarProduto(req)
    res.status(201).json("Produto criado com sucesso")
}

export const atualizarProdutoController = async (req, res) => {
    const produtoAtualizado = await atualizarProduto(req)
    if (produtoAtualizado != null) {
        res.status(200).json("Produto atualizado com sucesso")
    } else {
        res.status(404).json("Produto não encontrado")
    }
}

export const deletarProdutoController = async (req, res) => {
    const produtoDeletado = await deletarProduto(req)
    if (produtoDeletado != null) {
        res.status(200).json("Produto deletado com sucesso")
    } else {
        res.status(404).json("Produto não encontrado")
    }
}