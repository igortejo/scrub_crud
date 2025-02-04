// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

import { db } from "../db.js"

export const listarPedidos = async (req, res) => {
    const consulta = "SELECT * FROM pedidos";
  
    try {
      const [data] = await db.query(consulta); 
      return data;
      
    } catch (err) {
      throw new Error("Erro ao buscar pedidos: " + err.message);
    }
  };
  
  export const criarPedido = async (req) => {
    const consulta = "INSERT INTO pedidos(`descricao`, `usuarioId`, `valorTotal`) VALUES(?)";
  
    const values = [
      req.body.descricao,
      req.body.usuarioId,
      req.body.valorTotal
    ];
  
      await db.query(consulta, [values]); 
  };
  
  export const atualizarPedido = async (req) => {
    const consulta = "UPDATE pedidos SET `descricao` = ?, `usuarioId` = ?, `valorTotal` = ? WHERE `id` = ?";
  
    const values = [
      req.body.descricao,
      req.body.usuarioId,
      req.body.valorTotal
    ];
  
      await db.query(consulta, [...values, req.params.id]); 
  };
  
  export const deletarPedido = async (req) => {
    const consulta = "DELETE FROM pedidos WHERE `id` = ?";
  
      await db.query(consulta, req.params.id); 
  };
  

// export const listarPedidos = async () => {
//     const pedidosLista = prisma.pedido.findMany({
//         select: {
//             id: true,
//             descricao: true,
//             usuarioId: true,
//             valorTotal: true
//         }
//     })
//     return pedidosLista
// }


// export const criarPedido = async ({ descricao, usuarioId, valorTotal }) => {
//     return await prisma.pedido.create({
//         data: {
//             descricao,
//             usuarioId,
//             valorTotal
//         }
//     })
// }

// export const atualizarPedido = async (id, { descricao, usuarioId, valorTotal }) => {
//     return await prisma.pedido.update({
//         where: {
//             id: id
//         },
//         data: {
//             descricao,
//             usuarioId,
//             valorTotal
//         }
//     })
// }

// export const deletarPedido = async (id) => {
//     return await prisma.pedido.delete({
//         where: {
//             id: id
//         }
//     })
// }