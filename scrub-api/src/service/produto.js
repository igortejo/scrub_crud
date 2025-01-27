import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const listarProdutos = async () => {
    const produtos = await prisma.produto.findMany({
        select: {
            id: true,
            cor: true,
            tamanho: true,
          },
    })
    return produtos
}

export const criarProduto = async ({ cor, tamanho }) => {
    return await prisma.produto.create({
        data: {
            cor,
            tamanho
        }
    })
}

export const atualizarProduto = async (id, { cor, tamanho }) => {
    return await prisma.produto.update({
        where: {
            id: id
        },
        data: {
            cor,
            tamanho
        }
    })
}

export const deletarProduto = async (id) => {
    return await prisma.produto.delete({
        where: {
            id: id
        }
    })
}