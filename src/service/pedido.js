import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export const listarPedidos = async () => {
    const pedidosLista = prisma.pedido.findMany({
        select: {
            id: true,
            descricao: true,
            usuarioId: true,
            dataPedido: true,
            valorTotal: true
        }
    })
    return pedidosLista
}

export const criarPedido = async ({ descricao, usuarioId, valorTotal }) => {
    return await prisma.pedido.create({
        data: {
            descricao,
            usuarioId,
            valorTotal
        }
    })
}

export const atualizarPedido = async (id, { descricao, usuarioId, valorTotal }) => {
    return await prisma.pedido.update({
        where: {
            id: id
        },
        data: {
            descricao,
            usuarioId,
            valorTotal
        }
    })
}

export const deletarPedido = async (id) => {
    return await prisma.pedido.delete({
        where: {
            id: id
        }
    })
}