const  Produto  = require('../model/produto');


export const listarProdutos = async () => {
    try {
        return await Produto.findAll()
    } catch (error) {
        throw new Error("Erro ao listar produtos: " + error.message);
    }
}

export const criarProduto = async (req) => {
    try {
        const {cor, tamanho} = req.body;
        const produto = await Produto.create({
            cor,
            tamanho
        })
        return produto;
    } catch (error) {
        throw new Error("Erro ao criar produto: " + error.message);
    }
}

export const atualizarProduto = async (req) => {
    try {
        const {cor, tamanho} = req.body;
        const {id} = req.params;
        const produto = await Produto.findByPk(id)

        if(produto) {
            const produto = await Produto.update({
                cor,
                tamanho
            }, {
                where: {
                    id: id
                }
            })
        }
        return produto;
    } catch (error) {
        throw new Error("Erro ao atualizar produto: " + error.message);
    }
}

export const deletarProduto = async (req) => {
  try {
    const {id} = req.params;
    const produto = await Produto.findByPk(id);

    if(produto) {
        const produto = await Produto.destroy({
            where: {
                id: id
            }
        })
    }
    return produto;
  } catch (error) {
    throw new Error("Erro ao deletar produto: " + error.message);
  }
}