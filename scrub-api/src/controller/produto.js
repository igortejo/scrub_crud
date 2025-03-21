const { listarProdutos, criarProduto, atualizarProduto, deletarProduto } = require('../service/produto.js');

const listarProdutosController = async (req, res) => {
    const produtosLista = await listarProdutos();
    res.send(produtosLista);
};

const criarProdutoController = async (req, res) => {
    const produtoCriado = await criarProduto(req);
    res.status(201).json({
        message: "Produto criado com sucesso",
        produto: produtoCriado  //dados enviados pelo back
    });
};

const atualizarProdutoController = async (req, res) => {
    try {
        const produtoAtualizado = await atualizarProduto(req);
        res.status(200).json({
            message: "Produto atualizado com sucesso!",
            produto: produtoAtualizado  //dados enviados pelo back
        });
      } catch (error) {
        if (error.message === "Produto não encontrado!") {
          return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: "Erro ao atualizar produto", error: error.message });
      }
};

const deletarProdutoController = async (req, res) => {
    try {
        const produtoDeletado = await deletarProduto(req)
        res.status(200).json({
            message: "Produto deletado com sucesso!",
            pedido: produtoDeletado  //dados enviados pelo back
        });
      } catch (error) {
        if (error.message === "Produto não encontrado!") {
          return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: "Erro ao deletar produto", error: error.message });
      }
};

module.exports = { listarProdutosController, criarProdutoController, atualizarProdutoController, deletarProdutoController };