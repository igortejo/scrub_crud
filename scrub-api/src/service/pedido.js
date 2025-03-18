import Pedido from '../model/pedido.js';

export const listarPedidos = async (req, res) => {
  try {
      return await Pedido.findAll();    

    } catch (err) {
      throw new Error("Erro ao listar pedidos: " + err.message);
    }
  };
  
  export const criarPedido = async (req) => {
    try {
      const {descricao, usuarioId, valorTotal } = req.body;
      const pedido = await Pedido.create({
        descricao,
        usuarioId,
        valorTotal
      })
      return pedido;
    } catch (error) {
      throw new Error("Erro ao criar pedido: " + error.message);
    }
  };
  
  export const atualizarPedido = async (req) => {

    try {
      const {descricao, usuarioId, valorTotal } = req.body;
      const { id } = req.params;
      const pedido = await Pedido.findByPk(id);

      if(pedido) {
        const pedido = Pedido.update({
          descricao,
          usuarioId,
          valorTotal
        }, {
          where: {
            id: id
          }
        })
      }
      return pedido;
    } catch (error) {
      throw new Error("Erro ao atualizar pedido: " + error.message);
    }
  };
  
  export const deletarPedido = async (req) => {
    try {
      const { id } = req.params;
      const pedido = await Pedido.findByPk(id); 

      if(pedido) {
        const pedido = await Pedido.destroy({
          where: {
            id: id
          }
        })
      }
      return pedido;
    } catch (error) {
      throw new Error("Erro ao deletar pedido: " + error.message);
    }
  };