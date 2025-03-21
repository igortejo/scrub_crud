const Pedido = require('../model/pedido.js');

const listarPedidos = async (req, res) => {
  try {
      return await Pedido.findAll();    
  } catch (err) {
      throw new Error("Erro ao listar pedidos: " + err.message);
  }
};

const criarPedido = async (req) => {
  try {
      const { descricao, usuarioId, valorTotal } = req.body;
      const pedido = await Pedido.create({
          descricao,
          usuarioId,
          valorTotal
      });
      return pedido;
  } catch (error) {
      throw new Error("Erro ao criar pedido: " + error.message);
  }
};

const atualizarPedido = async (req) => {
  try {
      const { descricao, usuarioId, valorTotal } = req.body;
      const { id } = req.params;
      const pedido = await Pedido.findByPk(id);

      if(!pedido) {
        throw new Error("Pedido não encontrado!");
      }

    await Pedido.update({
        descricao,
        usuarioId,
        valorTotal
    }, {
        where: { 
            id: id 
        }
    });
    return Pedido.findByPk(id);

  } catch (error) {
      throw new Error(error.message);
  }
};

const deletarPedido = async (req) => {
  try {
      const { id } = req.params;
      const pedido = await Pedido.findByPk(id);

      if(!pedido) {
        throw new Error("Pedido não encontrado!");
      }
      await Pedido.destroy({
        where: {
            id: id
        }
        });
      return pedido;
    
  } catch (error) {
      throw new Error(error.message);
  }
};

module.exports = {listarPedidos, criarPedido, atualizarPedido, deletarPedido};