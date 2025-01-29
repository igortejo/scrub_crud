import {listarPedidos, criarPedido, atualizarPedido, deletarPedido} from '../service/pedido'


export const listarPedidosController = async (req, res) => {
    const pedidosLista = await listarPedidos()
    res.send(pedidosLista)
}

export const criarPedidoController = async (req, res) => {
    const pedidoCriado = await criarPedido(req.body)
    res.status(201).json("Pedido criado com sucesso")

}

export const atualizarPedidoController = async (req, res) => {
    const pedidoAtualizado = await atualizarPedido(req.params.id, req.body)
    res.status(200).json("Pedido atualizado com sucesso")
}

export const deletarPedidoController = async (req, res) => {
    const pedidoDeletado = await deletarPedido(req.params.id)
    res.status(200).json("Pedido deletado com sucesso")
}