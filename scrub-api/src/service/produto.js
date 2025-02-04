// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

import { db } from "../db.js"

export const listarProdutos = async () => {
    const consulta = "SELECT * FROM produtos"

    try {
        const [data] = await db.query(consulta)
        return data;
    } catch (error) {
        throw new Error("Erro ao buscar usuários: " + err.message);
    }
}

export const criarProduto = async (req) => {
    const consulta = "INSERT INTO produtos (`cor`, `tamanho`) VALUES(?)"

    const values = [
        req.body.cor,
        req.body.tamanho
    ]

    await db.query(consulta, [values]);
}

export const atualizarProduto = async (req) => {
    const consulta = "UPDATE produtos SET `cor` = ?, `tamanho` = ? WHERE `id` = ?"

    const values = [
        req.body.cor,
        req.body.tamanho
    ]

    await db.query(consulta, [...values, req.params.id]);


}

export const deletarProduto = async (req) => {
   const consulta = "DELETE FROM produtos WHERE `id` = ?"
   
   await db.query(consulta, req.params.id)
}


// export const listarProdutos = async () => {
//     const produtos = await prisma.produto.findMany({
//         select: {
//             id: true,
//             cor: true,
//             tamanho: true,
//           },
//     })
//     return produtos
// }

// export const criarProduto = async ({ cor, tamanho }) => {
//     return await prisma.produto.create({
//         data: {
//             cor,
//             tamanho
//         }
//     })
// }

// export const atualizarProduto = async (id, { cor, tamanho }) => {
//     return await prisma.produto.update({
//         where: {
//             id: id
//         },
//         data: {
//             cor,
//             tamanho
//         }
//     })
// }

// export const deletarProduto = async (id) => {
//     return await prisma.produto.delete({
//         where: {
//             id: id
//         }
//     })
// }