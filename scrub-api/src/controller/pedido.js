import {listarPedidos, criarPedido, atualizarPedido, deletarPedido} from '../service/pedido.js'


export const listarPedidosController = async (req, res) => {
    const pedidosLista = await listarPedidos()
    res.send(pedidosLista)
}

export const criarPedidoController = async (req, res) => {
    const pedidoCriado = await criarPedido(req)
    res.status(201).json("Pedido criado com sucesso")

}

export const atualizarPedidoController = async (req, res) => {
    const pedidoAtualizado = await atualizarPedido(req)
    if (pedidoAtualizado != null) {
        res.status(200).json("Pedido atualizado com sucesso")
    } else {
        res.status(404).json("Pedido não encontrado")
    }
}

export const deletarPedidoController = async (req, res) => {
    const pedidoDeletado = await deletarPedido(req)
    if (pedidoDeletado != null) {
        res.status(200).json("Pedido deletado com sucesso")
    } else {
        res.status(404).json("Pedido não encontrado")
    }
}