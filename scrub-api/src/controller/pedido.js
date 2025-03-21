const { listarPedidos, criarPedido, atualizarPedido, deletarPedido } = require('../service/pedido.js');

const listarPedidosController = async (req, res) => {
    const pedidosLista = await listarPedidos();
    res.send(pedidosLista);
};

const criarPedidoController = async (req, res) => {
    const pedidoCriado = await criarPedido(req);
    res.status(201).json({
        message: "Pedido criado com sucesso!",
        pedido: pedidoCriado  //dados enviados pelo back
    });
};

const atualizarPedidoController = async (req, res) => {
    try {
        const pedidoAtualizado = await atualizarPedido(req);
        res.status(200).json({
            message: "Pedido atualizado com sucesso!",
            pedido: pedidoAtualizado  //dados enviados pelo back
        });
      } catch (error) {
        if (error.message === "Pedido não encontrado!") {
          return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: "Erro ao atualizar pedido", error: error.message });
      }
};

const deletarPedidoController = async (req, res) => {
    try {
        const pedidoDeletado = await deletarPedido(req);
        res.status(200).json({
            message: "Pedido deletado com sucesso!",
            usuario: pedidoDeletado  //dados enviados pelo back
        });
      } catch (error) {
        if (error.message === "Pedido não encontrado!") {
          return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: "Erro ao deletar pedido", error: error.message });
      }
};

module.exports = { listarPedidosController, criarPedidoController, atualizarPedidoController, deletarPedidoController };
