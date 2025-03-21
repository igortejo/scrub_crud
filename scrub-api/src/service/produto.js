const Produto = require('../model/produto.js');

const listarProdutos = async () => {
    try {
        return await Produto.findAll();
    } catch (error) {
        throw new Error("Erro ao listar produtos: " + error.message);
    }
};

const criarProduto = async (req) => {
    try {
        const { cor, tamanho } = req.body;
        const produto = await Produto.create({
            cor,
            tamanho
        });
        return produto;
    } catch (error) {
        throw new Error( error.message);
    }
};

const atualizarProduto = async (req) => {
    try {
        const { cor, tamanho } = req.body;
        const { id } = req.params;
        const produto = await Produto.findByPk(id);

        if (!produto) {
            throw new Error("Produto não encontrado!");
        }

        await Produto.update(
            { cor, tamanho },
            { where: { id: id } }
        );
        return Produto.findByPk(id); // Retorna o produto atualizado

    } catch (error) {
        throw new Error(error.message);
    }
};

const deletarProduto = async (req) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findByPk(id);

        if(!produto) {
            throw new Error("Produto não encontrado!");
        }

        
        await Produto.destroy({
            where: { id: id }
        });
        return produto;
        
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { listarProdutos, criarProduto, atualizarProduto, deletarProduto };