import {listarProdutos, criarProduto, atualizarProduto, deletarProduto} from '../service/produto'


export const listarProdutosController = async (req, res) => {
    const produtosLista = await listarProdutos()
    res.send(produtosLista)
}

export const criarProdutoController = async (req, res) => {
    const produtoCriado = await criarProduto(req.body)
    res.status(201).json("Produto criado com sucesso")
}

export const atualizarProdutoController = async (req, res) => {
    const produtoAtualizado = await atualizarProduto(req.params.id, req.body)
    res.status(200).json("Produto atualizado com sucesso")
}

export const deletarProdutoController = async (req, res) => {
    const produtoDeletado = await deletarProduto(req.params.id)
    res.status(200).json("Produto deletado com sucesso")
}